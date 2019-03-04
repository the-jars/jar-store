import {expect} from 'chai'
import {deleteItem, deleteCartItem} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Cart redux state', () => {
  let store
  let mockAxios
  const fakeItem1 = {cartId: 1, productId: 1}

  // the cart is an array of cartItems
  const initialState = {cart: [fakeItem1]}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('deleting items from cart', () => {
    beforeEach(() => {
      mockAxios.onDelete('/api/carts/1/1').replyOnce(204)
    })
    describe('deleteCartItem thunk', () => {
      it('makes axios request to /api/carts/1/1', async () => {
        // set-up fake axios
        const status = await store.dispatch(deleteCartItem(fakeItem1))
        expect(status).to.be.equal(204)
      })

      it('dispatches deleteItem action creator which returns the correct action', async () => {
        mockAxios.onDelete('/api/carts/1/1').replyOnce(204)
        await store.dispatch(deleteCartItem(fakeItem1))
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('DELETE_ITEM')
        expect(actions[0].itemToDelete).to.be.equal(fakeItem1)
      })
    }) // END describe('deleteCartItem thunk')
  }) // END describe('deleting items from cart')
})
