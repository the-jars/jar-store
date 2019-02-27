import axios from 'axios'

// ACTION TYPES
const GET_SINGLE_PRODUCT = 'GET_PRODUCT'

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

//REDUCER
const initialState = {
  currentProduct: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...state, currentProduct: action.product}
    default:
      return state
  }
}
