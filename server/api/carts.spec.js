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
const {Cart, CartItem} = require('../db/models')

describe('Cart routes', () => {
  beforeEach(() => {
    sinon.replace(Cart, 'findOrCreate', fakeFindOrCreate)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('/api/users', () => {
    beforeEach(() => {
      return Cart.create
    })
  })
})
