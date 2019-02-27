import axios from 'axios'

// ACTION TYPES
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// ACTION CREATORS
export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

// THUNKS
export const fetchSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

// initial staate is empty object for single product
export const singleProduct = function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
