const router = require('express').Router()
const {Cart, CartItem} = require('../db/models')

// Routes for /api/carts

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

module.exports = router
