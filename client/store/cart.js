import axios from 'axios'

// ACTION TYPES
const SET_CART = 'SET_CART'
const SET_CART_META = 'SET_CART_META'

// ACTION CREATORS
export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const setCartMeta = cartInfo => ({
  type: SET_CART_META,
  cartInfo
})

// THUNKS
export const fetchCartItems = userId => async dispatch => {
  try {
    const cart = await axios.get(`/api/carts/${userId}`)
    dispatch(setCart(cart.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchCartInfo = userId => async dispatch => {
  try {
    const cartInfo = await axios.post(`/api/carts`, userId)
    dispatch(setCartMeta(cartInfo))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
export const cart = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}

export const cartMeta = (state = {}, action) => {
  switch (action.type) {
    case SET_CART_META:
      return action.cartInfo
    default:
      return state
  }
}
