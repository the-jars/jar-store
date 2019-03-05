const router = require('express').Router()
const {Cart, CartItem, Product} = require('../db/models')
// Routes for /api/carts

// Routes for /api/carts

// POST/api/carts
// if passed a userId, will find or create an active cart for that user
// if passed the string 'null' for userId, it will create an an active cart using the sessionId instead
router.post('/:userId', async (req, res, next) => {
  try {
    let userId = req.params.userId
    let response
    // creates a session Cart for unauthenticated users
    if (userId === 'null') {
      userId = req.session.id
      response = await Cart.findOrCreate({
        where: {
          sessionId: userId,
          status: 'active'
        }
      })
    } else {
      // or finds any active user Carts, and creates one if there aren't any
      response = await Cart.findOrCreate({
        where: {
          userId: userId,
          status: 'active'
        }
      })
    }
    const cart = response[0]
    const cartId = cart.id
    //pull everything from cartitems with cartid
    const items = await CartItem.findAll({
      where: {
        cartId: cartId
      },
      //eager load product info
      include: [{model: Product}]
    })
    res.json({cart, items})
  } catch (error) {
    next(error)
  }
})
// when cartId is provided, grab that cart and move onto the next route
router.param('cartId', (req, res, next, cartId) =>
  Cart.findById(cartId, {include: [CartItem]})
    .then(cart => {
      req.cart = cart
      next()
      return null
    })
    .catch(next)
)

router.param('itemId', (req, res, next, itemId) =>
  CartItem.findById(itemId)
    .then(item => {
      req.item = item
      next()
      return null
    })
    .catch(next)
)

/** route for deleting cartItem from the cart
 * - happens afte dr router.param('cartId')
 * - recives id of cartItem to remove through the body as itemId
 * - uses magic method on the cart instance to unassociate the specific item
 * - after, remove that item from the database cartItem model
 */
router.delete('/:cartId/:itemId', (req, res, next) =>
  req.cart
    .removeCartitem(req.item.id)
    // if item was succesfully removed, also delete it from the cartItem
    // send status for succesfully deleted: 204
    .then(() => req.item.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
)

router.put('/:cartId/:productId', async (req, res, next) => {
  try {
    const [rowsUpdated, updatedCartItem] = await CartItem.update(
      {
        quantity: Number(req.body.value)
      },
      {
        returning: true,
        where: {
          cartId: Number(req.params.cartId),
          productId: req.params.productId
        }
      }
    )
    res.json(updatedCartItem)
  } catch (err) {
    next(err)
  }
})

// Routes for /api/carts
//GET /api/cart for getting cart by the logged in user
router.get('/:userId', async (req, res, next) => {
  try {
    //pull cartId with userid && active in cart table
    // console.log('id', req.body.userId)
    const carts = await Cart.findAll({
      where: {
        userId: req.params.userId,
        status: 'active'
      }
    })
    const cartIds = carts.map(cart => {
      return cart.id
    })
    // pull everything from cartitems with cartid
    const items = await CartItem.findAll({
      where: {
        cartId: {
          $in: cartIds
        }
      },
      //eager load product info
      include: [{model: Product}]
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

// Routes for /api/carts
//GET /api/cart for getting cart by the logged in user
router.get('/:userId', async (req, res, next) => {
  try {
    //pull cartId with userid && active in cart table
    const carts = await Cart.findAll({
      where: {
        userId: req.params.userId,
        status: 'active'
      }
    })
    const cartIds = carts.map(cart => {
      return cart.id
    })
    // pull everything from cartitems with cartid
    const items = await CartItem.findAll({
      where: {
        cartId: {
          $in: cartIds
        }
      },
      //eager load product info
      include: [{model: Product}]
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

// POST /api/carts/:cartID/products/:productID
// Adds product to cart or increments it if it's already there
router.post('/:cartId/products/:productId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    const productId = req.params.productId
    const isAlreadyInCart = await CartItem.findOne({
      where: {
        cartId: cartId,
        productId: productId
      },
      //eager loads product
      include: [{model: Product}]
    })
    if (isAlreadyInCart) {
      await isAlreadyInCart.increment('quantity', {by: 1})
      res.json(isAlreadyInCart)
    } else {
      const createdCartItem = await CartItem.create({
        cartId: cartId,
        productId: productId,
        quantity: 1
      })
      // you can't eager laod on a create, so now we have to find the cart we just created
      const createdWithProduct = await CartItem.findOne({
        where: {
          id: createdCartItem.id
        },
        //eager load product
        include: [{model: Product}]
      })
      res.json(createdWithProduct)
    }
  } catch (error) {
    next(error)
  }
})

// when cartId is provided, grab that cart and move onto the next route
router.param('cartId', (req, res, next, cartId) =>
  Cart.findById(cartId, {include: [CartItem]})
    .then(cart => {
      req.cart = cart
      next()
      return null
    })
    .catch(next)
)

router.param('itemId', (req, res, next, itemId) =>
  CartItem.findById(itemId)
    .then(item => {
      req.item = item
      next()
      return null
    })
    .catch(next)
)

/** route for deleting cartItem from the cart
 * - happens afte dr router.param('cartId')
 * - recives id of cartItem to remove through the body as itemId
 * - uses magic method on the cart instance to unassociate the specific item
 * - after, remove that item from the database cartItem model
 */
router.delete('/:cartId/:itemId', (req, res, next) =>
  req.cart
    .removeCartitem(req.item.id)
    // if item was succesfully removed, also delete it from the cartItem
    // send status for succesfully deleted: 204
    .then(() => req.item.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
)

// Routes for /api/carts
// We might be able to get rid of this route since the post route for the same endpoint
// returns the same info but also creates a cart if there isn't one
// GET /api/cart/userId for getting cart by the logged in user
router.get('/:userId', async (req, res, next) => {
  try {
    //pull cartId with userid && active in cart table
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        status: 'active'
      }
    })
    const cartId = cart.id
    //pull everything from cartitems with cartid
    const items = await CartItem.findAll({
      where: {
        cartId: cartId
      },
      //eager load product info
      include: [{model: Product}]
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

module.exports = router
