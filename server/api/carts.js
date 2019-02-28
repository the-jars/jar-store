const router = require('express').Router()
const {Cart} = require('../db/models')

// Routes for /api/carts

// POST/api/carts
router.post('/', async (req, res, next) => {
  try {
    const response = await Cart.findOrCreate({
      where: {
        userId: req.body.userId,
        status: 'active'
      }
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
