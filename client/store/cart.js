import axios from 'axios'

// ACTION TYPES
const SET_CART = 'SET_CART'
const INSTANTIATE_CART = 'INSTANTIATE_CART'

// ACTION CREATORS
export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const instantiateCart = cartInfo => ({
  type: INSTANTIATE_CART,
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
    dispatch(instantiateCart(cartInfo))
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
    case INSTANTIATE_CART:
      return action.cartInfo
    default:
      return state
  }
}
