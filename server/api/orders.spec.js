const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const OrderProduct = db.model('orderProduct')
const User = db.model('user')
const Cart = db.model('cart')
const CartItem = db.model('cartitem')
const Product = db.model('product')
const Address = db.model('address')

describe('/api/orders/ route', () => {
  let cart
  let fartJar
  let barfJar
  let oneFartJar
  let twoBarfJar

  let dirtyUser

  let fullstackAddress
  let realAddress

  let order
  let purchasedFartJar
  let purchasedBarfJar
  // set up cart for purchase
  beforeEach(async () => {
    await db.sync({force: true})
    cart = await Cart.create()
    fartJar = await Product.create({name: 'fart jar', price: '12.00'})
    barfJar = await Product.create({name: 'barf jar', price: '6.00'})
    // putting one 'Fart Jar' into the cart
    oneFartJar = await CartItem.create({quantity: 1})
      .then(async item => {
        await item.setProduct(fartJar)
        await item.setCart(cart)
        await cart.addCartitem(item)
        return item
      })
      .catch(console.error)
    // putting two 'Barf Jar' into the cart
    twoBarfJar = await CartItem.create({quantity: 2})
      .then(async item => {
        await item.setProduct(barfJar)
        await item.setCart(cart)
        await cart.addCartitem(item)
        return item
      })
      .catch(console.error)

    dirtyUser = await User.create({email: 'ilovefartsnbarfs@wierdo.com'})
      .then(async wierdo => {
        await wierdo.setCart(cart)
        return wierdo
      })
      .then(user => cart.setUser(user))
      .catch(console.error)

    fullstackAddress = await Address.create({
      line_1: '405 W Superior St.',
      line_2: '3rd floor',
      city: 'Chicago',
      state: 'IL',
      zip: '60605'
    })

    realAddress = await Address.create({
      line_1: 'black pike alley',
      line_2: 'King Tavern',
      city: "King's Landing",
      state: 'Westeros',
      zip: '100'
    })
    console.log(cart.id)
  })

  describe('/api/orders routes', () => {
    describe('POST /api/orders/', () => {
      it('creates new order from a given cart with the provided product', async () => {
        // create new order
        order = await request(app).post(`/api/orders/`, {
          cartId: cart.id,
          cartitems: cart.cartitems,
          userId: dirtyUser.id,
          orderInfo: {
            email: dirtyUser.email,
            shippingAddressId: fullstackAddress.id,
            billingAddressId: realAddress.id
          }
        })
        expect(order.products.length).to.be.equal(0)
      })
    }) // END describe('POST /api/orders/')
  })
})
