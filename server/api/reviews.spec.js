/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Review = db.model('review')
const Product = db.model('product')
const User = db.model('user')

describe('Review routes', () => {
  let review
  let productOne = {id: 5001, name: 'one'}
  let userOne = {id: 2001, email: 'userOne@test.test'}

  beforeEach(async () => {
    try {
      await db.sync()
      review = await Review.create({id: 200, rating: 2, reviewText: 'great!'})
      const productCreate = await Product.create(productOne)
      // productTwo = await Product.create({name: 'two'})
      const userCreate = await User.create(userOne)
      // userTwo = await User.create({email: 'userTwo@test.test'})
      review.setProduct(productCreate)
      review.setUser(userCreate)
      return review
    } catch (err) {
      console.error(err)
    }
  })

  it('POST /api/:productId/:userId', async () => {
    const res = await request(app)
      .post(`/api/${productOne.id}/${userOne.id}`)
      .expect(200)

    expect(res.body).to.be.an('object')
    expect(res.body.rating).to.be.equal(2)
    expect(res.body.productId).to.be.equal(productOne.id)
    expect(res.body.userId).to.be.equal(userOne.id)
  })
})
