const router = require('express').Router()
const {User} = require('../db/models')
const {Cart, CartItem} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'isAdmin',
        'forceReset',
        'addressId',
        'updatedAt'
      ],
      include: [{all: true, nested: true}]
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
    res.json(userCart[0])
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const [rowsUpdated, updatedUser] = await User.update(
      {
        isAdmin: true
      },
      {
        returning: true,
        where: {
          id: Number(req.params.userId)
        }
      }
    )
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const userToDelete = await User.findById(req.params.userId)
    await userToDelete.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
