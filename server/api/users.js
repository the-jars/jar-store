const router = require('express').Router()
const {User} = require('../db/models')
const {Cart} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'isAdmin',
        'forceReset',
        'addressId'
      ]
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
