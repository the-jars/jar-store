const router = require('express').Router()
const {User} = require('../db/models')
const {Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],
      include: [{all: true, nested: true}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/cart', async (req, res, next) => {
  try {
    let userCart
    if (req.params.id === 'null') {
      userCart = await Cart.findOrCreate({
        where: {
          sessionId: req.session.id
        }
      })
    } else {
      userCart = await Cart.findOrCreate({
        where: {
          userId: req.params.id
        }
      })
    }
    res.json(userCart[0])
  } catch (error) {
    next(error)
  }
})
