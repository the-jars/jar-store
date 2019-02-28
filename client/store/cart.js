import axios from 'axios'

// ACTION TYPES
const SET_CART = 'SET_CART'

// ACTION CREATORS
export const setCart = shoppingCart => ({
  type: SET_CART,
  shoppingCart
})

// THUNKS
export const fetchOrCreateCart = userId => async dispatch => {
  try {
    const shoppingCart = await axios.post('/api/carts', userId)
    dispatch(setCart(shoppingCart))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
export const shoppingCart = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.shoppingCart
    default:
      return state
  }
}
