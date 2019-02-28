const router = require('express').Router()
const {Cart, CartItem} = require('../db/models/cart')
const {Product} = require('../db/models/product')
const {User} = require('../db/models/user')

//GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    //pull cartId with userid && active in cart table
    console.log(req.body.userId)
    const cart = await Cart.findOne({
      where: {
        userId: req.body.userId,
        status: 'active'
      }
    })
    const cartId = cart.id
    //pull everything from cartitems with cartid
    const items = await CartItem.findAll({
      where: {
        cartId: cartId
      },
      //eager load product info
      include: [{model: Product}]
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})

module.exports = router
