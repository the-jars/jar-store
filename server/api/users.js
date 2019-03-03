const router = require('express').Router()
const {User} = require('../db/models')
const {Cart, CartItem} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// POST /api/users/userId/cart
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
    console.log(userCart[0].items)
    res.json(userCart[0])
  } catch (error) {
    next(error)
  }
})
