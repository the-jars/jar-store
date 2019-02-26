import axios from 'axios'

// ACTION TYPES
const GET_PRODUCT = 'GET_PRODUCT'

// ACTION CREATORS
export const getProduct = product => ({
  GET_PRODUCT,
  product
})

// THUNKS
export const fetchSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/product/${productId}`)
    dispatch(getProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER
const initialState = {
  currentProduct: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, currentProduct: action.product}
    default:
      return state
  }
}