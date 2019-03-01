/* global describe beforeEach it */
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import sinon from 'sinon'
const mock = new MockAdapter(axios)
const app = require('../server')
const agent = require('supertest')(app)
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const CartItem = db.model('cartitem')
const Product = db.model('product')

describe('Cart routes', () => {
  let cart
  let fartJar
  let barfJar
  let oneFartJar
  let twoBarfJar
  // set up cart route test
  // the test cart has one fart jar and two barf jar pre-loaded
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

  afterEach(() => db.sync({force: true}))

  describe('DELETE /api/carts/:cartId/:itemId', () => {
    it('deletes the item from the cartItem', async () => {
      // deletes the provided jar
      await request(app)
        .delete(`/api/carts/${cart.id}/${oneFartJar.id}`)
        .expect(204)
      // get the updated list of cart items
      const updateRes = await request(app)
        .get(`/api/carts/${cart.id}`)
        .expect(200)
      //
      const updatedCart = updateRes.body
      expect(updatedCart.length).to.be.equal(1)
    })
  }) // end describe('DELETE /api/carts/:cartId')
})
