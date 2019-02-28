const router = require('express').Router()
const {Cart, CartItem} = require('../db/models')

// Routes for /api/carts

router.param('cartId', (req, res, next, id) =>
  Cart.findById(id, {include: [CartItem]})
    .then(cart => {
      req.cart = cart
      next()
      return null
    })
    .catch(next)
)

//router.delete('/:cartId', (req, res, next) => )

module.exports = router
