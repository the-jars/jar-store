import axios from 'axios'

// ACTION TYPES
const SET_CART = 'SET_CART'
const INSTANTIATE_CART = 'INSTANTIATE_CART'
const ADDED_ITEM_TO_CART = 'ADDED_ITEM_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'

// ACTION CREATORS
// - for setting the cart of [...cartitems]
export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const instantiateCart = cartInfo => ({
  type: INSTANTIATE_CART,
  cartInfo
})

export const addedItemToCart = cartItem => ({
  type: ADDED_ITEM_TO_CART,
  cartItem
})

//check to see if cart exists
//if it does, we run xyz
//if no, we create cart and then call the thunk that adds item to it

export const deleteItem = itemToDelete => ({
  type: DELETE_ITEM,
  itemToDelete
})

// THUNKS
// - for fetching all items in carts
export const fetchCartItems = userId => async dispatch => {
  try {
    console.log('Im being run', userId)
    const cart = await axios.get(`/api/carts/${userId}`)
    console.log('im a cart', cart)
    dispatch(setCart(cart.data))
  } catch (error) {
    console.error(error)
  }
}

// - for deleting one item from the array
export const deleteCartItem = itemToDelete => dispatch =>
  axios
    .delete(`/api/carts/${itemToDelete.cartId}/${itemToDelete.productId}`)
    .then(res => {
      // status is 204 when delete is succesful
      if (res.status === 204) dispatch(deleteItem(itemToDelete))
      else
        throw new Error(
          'Delete item failed: something went wrong on the server.'
        )
      return res.status
    })
    .catch(console.log)

// Might  not be needed anymore
export const fetchCartInfo = userId => async dispatch => {
  try {
    console.log('fetchingCartInfo', userId)
    const cartInfo = await axios.post(`/api/carts/${userId}`)
    dispatch(instantiateCart(cartInfo.data))
  } catch (error) {
    console.error(error)
  }
}

// add item to cart if it exists
export const addItemToCart = (productId, cartId) => async dispatch => {
  try {
    console.log('I am addItemToCart thunk')
    if (!cartId === undefined) {
      cartId = 'null'
    }
    const response = await axios.post(
      `/api/carts/${cartId}/products/${productId}`
    )
    const cartItem = response.data
    console.log('im a cart item', cartItem)
    dispatch(addedItemToCart(cartItem))
  } catch (error) {
    console.error(error)
  }
}

// creates a cart and add and item to it if it is passed a productID
export const createNewCart = (userId, productId) => async dispatch => {
  try {
    console.log('I am creatNewCart thunk')
    const response = await axios.post(`/api/users/${userId}/cart`)
    const newCart = response.data
    console.log('I am a new cart', newCart)
    dispatch(instantiateCart(newCart))
    if (productId) {
      dispatch(addItemToCart(productId, newCart.id))
    }
  } catch (error) {
    console.error(error)
  }
}

const filterHelper = (state, updatedItem) => {
  console.log('updatedItem', updatedItem)
  const filteredState = state.filter(item => item.id !== updatedItem.id)
  return [...filteredState, updatedItem]
}

// REDUCER
export const cart = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case DELETE_ITEM:
      return state.filter(
        value => value.productId !== action.itemToDelete.productId
      )
    case ADDED_ITEM_TO_CART:
      return filterHelper(state, action.cartItem)
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
