const router = require('express').Router()
const {Cart, CartItem, Product} = require('../db/models')
// Routes for /api/carts

// POST/api/carts

// if passed a userId, will find or create an active cart for that user
// if passed the string 'null' for userId, it will create an an active cart using the sessionId instead
router.post('/:userId', async (req, res, next) => {
  try {
    let userId = req.params.userId
    let response
    console.log('im the userId on the body', userId)
    if (userId === 'null') {
      userId = req.session.id
      response = await Cart.findOrCreate({
        where: {
          sessionId: userId,
          status: 'active'
        }
      })
    } else {
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
    // console.log('i am items', items)
    res.json({cart, items})
  } catch (error) {
    next(error)
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
      include: [{model: Product}]
    })
    // console.log(Object.keys(isAlreadyInCart.__proto__))
    if (isAlreadyInCart) {
      await isAlreadyInCart.increment('quantity', {by: 1})
      res.json(isAlreadyInCart)
    } else {
      const createdCartItem = await CartItem.create({
        cartId: cartId,
        productId: productId,
        quantity: 1
      })
      const createdWithProduct = await CartItem.findOne({
        where: {
          id: createdCartItem.id
        },
        include: [{model: Product}]
      })

      // const createdItemsProduct = await createdCartItem.getProduct()
      // createdCartItem.product = createdItemsProduct
      // console.log(createdItemsProduct.data)
      // console.log(Object.keys(createdCartItem.__proto__))
      // console.log(createdWithProduct)
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
router.delete('/:cartId/:itemId', (req, res, next) => {
  req.cart
    .removeCartitem(req.item.id)
    // if item was succesfully removed, also delete it from the cartItem
    // send status for succesfully deleted: 204
    .then(() => req.item.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})

// GET /api/cart/unauth/ for getting cart by sessionId for unauthenticated users
router.get('/unauth/', async (req, res, next) => {
  try {
    //pull cartId with userid && active in cart table
    console.log('id', req.body.userId)
    const cart = await Cart.findOne({
      where: {
        userId: req.session.id,
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

// Routes for /api/carts
//GET /api/cart/userId for getting cart by the logged in user
router.get('/:userId', async (req, res, next) => {
  try {
    //pull cartId with userid && active in cart table
    console.log('id', req.body.userId)
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
