import axios from 'axios'
// import {Category} from '.../server/db/models/product.js'
// // ACTION TYPES
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const ADD_PRODUCT_CATEGORY = 'ADD_PRODUCT_CATEGORY'
// // ACTION CREATORS
export const getProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})
export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})
export const addProductCategory = productCategory => ({
  type: ADD_PRODUCT_CATEGORY,
  productCategory
})

// // THUNKS
export const fetchSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(getProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const filterCategories = filter => async dispatch => {
  try {
    const res = await axios.get(
      `/api/categories/filterProduct?filter=${filter}`
    )
    dispatch(getProducts(res.data))
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

// // thunk for editing selected project
export const editSingleProduct = (id, editField) => dispatch => {
  axios
    .put(`/api/products/${id}`, editField)
    .then(response => dispatch(getProduct(response.data)))
    .catch(console.log)
}

// export const getCategory = () => dispatch => {
//   axios.get()
// }

export const addProductThunk = newProductInfo => dispatch => {
  axios
    .post(`/api/products`, newProductInfo)
    .then(res => dispatch(addProduct(res.data)))
    .catch(console.log)
}

// export const fetchNewProductCategory = (categoryId, productId) => dispatch => {
//   axios
//     .post(`/api/products/${productId}/categories/${categoryId}`)
//     .then(res => dispatch(addProductCategory(res.data)))
//     .catch(console.log)
// }

export const fetchNewProductCategory = (
  categoryId,
  productId
) => async dispatch => {
  try {
    const newProductCategory = await axios.post(
      `/api/products/${productId}/categories/${categoryId}`
    )
    console.log('created new produtcategory: ', newProductCategory.data)
  } catch (err) {
    console.error(err)
  }
}

//REDUCER(S?)
// initial state is empty object for single product
export const singleProduct = function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    // case ADD_PRODUCT_CATEGORY:
    //   return {
    //     ...state,
    //     categories: [...state.categories, action.productCategory]
    //   }
    default:
      return state
  }
}

//initial state is empty array for all products
export const allProducts = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
