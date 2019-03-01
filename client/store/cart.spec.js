import {expect} from 'chai'
import {deleteCartItem} from './cart'
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
    console.log(store.getState())
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('deleting cartItem', () => {
    describe('deleteCartItem thunk', () => {
      it('deletes the', async () => {
        mockAxios.onDelete('/api/carts/1/1').replyOnce(204)
        const status = await store.dispatch(deleteCartItem(fakeItem1))
        expect(status).to.be.equal(204)
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('DELETE_ITEM')
      })
    })
  })
})
