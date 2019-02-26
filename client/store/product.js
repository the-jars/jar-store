import axios from 'axios'

// ACTION TYPES
const GET_PRODUCT = 'GET_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'

// ACTION CREATORS
export const getProduct = product => ({
  type: GET_PRODUCT,

  product
})
export const getProducts = products => ({
  GET_PRODUCTS,
  products
})

// THUNKS
export const fetchSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    console.log('data', res.data)

    dispatch(getProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/products`)
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

//REDUCER
const initialState = {
  products: [],
  currentProduct: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return {...state, currentProduct: action.product}
    case GET_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}
