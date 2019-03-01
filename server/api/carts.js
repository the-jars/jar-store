const router = require('express').Router()
const {Cart} = require('../db/models')

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

module.exports = router
