import axios from 'axios'

// ACTION TYPES
const SET_CART = 'SET_CART'

// ACTION CREATORS
export const setCart = cart => ({
  type: SET_CART,
  cart
})

// THUNKS
export const fetchCartItems = userId => async dispatch => {
  try {
    const cart = await axios.get(`/api/carts/${userId}`)
    console.log('userId', userId)
    dispatch(setCart(cart.data))
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
