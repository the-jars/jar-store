const router = require('express').Router()
const {Cart, CartItem} = require('../db/models')

// Routes for /api/carts

// POST/api/carts
router.post('/', async (req, res, next) => {
  try {
    const response = await Cart.findOrCreate({
      where: {
        userId: req.body.userId,
        status: 'active'
      },
      include: [CartItem]
    })
    const userCart = response[1]
    res.json(userCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
