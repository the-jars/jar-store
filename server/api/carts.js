const router = require('express').Router()
const {Cart, CartItem, Product} = require('../db/models')
// Routes for /api/carts

// POST/api/carts
router.post('/', async (req, res, next) => {
  try {
    let userId = req.body.userId
    if (!userId) {
      userId = req.session.id
      const response = await Cart.findOrCreate({
        where: {
          sessionId: userId,
          status: 'active'
        }
      })
      res.json(response[0])
    }
    const response = await Cart.findOrCreate({
      where: {
        userId: userId,
        status: 'active'
      }
    })
    res.json(response[0])
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
    console.log(
      'cartId',
      req.params.cartId,
      'productId',
      req.params.productId,
      'qty',
      req.body.value
    )
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
    // const [num, updatedCartItem] = await cartItemToUpdate.update(
    //   {
    //     quantity: Number(req.body.value)
    //   },
    //   {returning: true}
    // )
    //console.log(updatedCartItem)
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

//if cartitem has this productid + cartid combo, increment that quantity
//else create productid + cartid combo w quantity 1
router.post('/:cartId/products/:productId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    const productId = req.params.productId

    //check cartitem
    const isAlreadyInCart = await CartItem.findOne({
      where: {
        cartId: cartId,
        productId: productId
      }
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
      res.json(createdCartItem)
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
//GET /api/cart for getting cart by the logged in user
router.get('/:userId', async (req, res, next) => {
  try {
    //pull cartId with userid && active in cart table
    // console.log('id', req.body.userId)
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
