const router = require('express').Router()
const {Cart} = require('../db/models')
const {CartItem} = require('../db/models')
// Routes for /api/carts

// POST/api/carts
router.post('/', async (req, res, next) => {
  try {
    let userId = req.body.userId
    if (!userId) {
      userId = req.session.id
      const response = await Cart.findOrCreate({
        where: {
          sessionId: userId
          // status: 'active'
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
      await CartItem.create({
        cartId: cartId,
        productId: productId,
        quantity: 1
      })
    }
    //if cartitem has this productid + cartid combo, increment that quantity
    //else create productid + cartid combo w quantity 1
  } catch (err) {
    next(err)
  }
})

module.exports = router
