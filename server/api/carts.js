const router = require('express').Router()
const {Cart} = require('../db/models')

// Routes for /api/carts

// POST/api/carts
router.post('/', async (req, res, next) => {
  try {
    const response = await Cart.findOrCreate({
      where: {
        userId: req.body.userId
        // status: 'active'
      }
    })
    console.log(response.data)
    const userCart = response[1].id
    res.json(userCart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
