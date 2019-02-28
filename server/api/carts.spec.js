const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const CartItem = db.model('cartitem')
const Product = db.model('product')

describe('Cart routes', () => {
  // set up cart route test
  // the test cart has one fart jar and two barf jar pre-loaded
  let cart
  let fartJar
  let barfJar
  let oneFartJar
  let twoBarfJar
  beforeEach(async () => {
    await db.sync({force: true})
    cart = await Cart.create()
    fartJar = await Product.create({name: 'fart jar'})
    barfJar = await Product.create({name: 'barf jar'})
    // putting one 'Fart Jar' into the cart
    oneFartJar = await CartItem.create({quantity: 1})
      .then(async item => {
        await item.setProduct(fartJar)
        await item.setCart(cart)
        await cart.addCartitem(item)
        return item
      })
      .catch(console.log)
    // putting two 'Barf Jar' into the cart
    twoBarfJar = await CartItem.create({quantity: 2})
      .then(async item => {
        await item.setProduct(barfJar)
        await item.setCart(cart)
        await cart.addCartitem(item)
        return item
      })
      .catch(console.log)
  })

  describe('DELETE /api/carts/:cartId/:itemId', () => {
    it('deletes the item from the cartItem', async () => {
      const res = await request(app)
        .delete(`/api/carts/${cart.id}/${oneFartJar.id}`)
        .expect(204)
      console.log(res.data)
      expect(res.data).to.be.equal([oneFartJar, twoBarfJar])
    })
  }) // end describe('DELETE /api/carts/:cartId')
})
