const router = require('express').Router()
const {Cart, CartItem, Product} = require('../db/models')

// POST/api/carts
router.post('/', async (req, res, next) => {
  try {
    let userId = req.body.userId
    if (!userId) {
      userId = req.session.id
    }
    const response = await Cart.findOrCreate({
      where: {
        userId: userId,
        status: 'active'
      }
    })
    // const userCart = response
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

router.put('/:cartId/:itemId', async (req, res, next) => {
  try {
    console.log(req.body.quantity)
    const cartItemToUpdate = await CartItem.findOne({
      where: {
        cartId: Number(req.params.cartId)
      }
    })
    const updatedCartItem = await cartItemToUpdate.update({
      quantity: req.body.quantity,
      where: {
        productId: req.params.itemId
      }
    })
    res.status(204).json(updatedCartItem)
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

module.exports = router
