import axios from 'axios'

// ACTION TYPES
const SET_CART = 'SET_CART'
const RESET_CART = 'RESET_CART'
const SET_META_DATA = 'SET_META_DATA'
const ADDED_ITEM_TO_CART = 'ADDED_ITEM_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'

// ACTION CREATORS
// - for setting the cart of [...cartitems]
export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const setMetaData = cartInfo => ({
  type: SET_META_DATA,
  cartInfo
})

export const addedItemToCart = cartItem => ({
  type: ADDED_ITEM_TO_CART,
  cartItem
})

export const deleteItem = itemToDelete => ({
  type: DELETE_ITEM,
  itemToDelete
})

// THUNKS
// - for fetching all items in carts along with metadata
export const fetchCartItems = userId => async dispatch => {
  try {
    const cart = await axios.get(`/api/carts/${userId}`)
    dispatch(setCart(cart.data))
  } catch (error) {
    console.error(error)
  }
}

// export const fetchCartItemsByCartId = cartId => async dispatch => {
//   try {
//     const cart = await axios.get(`/api/carts/${userId}`)
//     dispatch(setCart(cart.data))
//   } catch (error) {
//     console.error(error)
//   }
// }

// fetches active cart metadata and cartItems and puts it on state
export const fetchCartInfo = userId => async dispatch => {
  try {
    console.log('fetchingCartInfo', userId)
    const cartInfo = await axios.post(`/api/carts/${userId}`)
    console.log(cartInfo)
    dispatch(setCart(cartInfo.data.items))
    dispatch(setMetaData(cartInfo.data.cart))
  } catch (error) {
    console.error(error)
  }
}
// - for deleting one item from the array
export const deleteCartItem = itemToDelete => dispatch => {
  console.log('to Delete', itemToDelete)
  axios
    .delete(`/api/carts/${itemToDelete.cartId}/${itemToDelete.id}`)
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

// // creates a cart and add and item to it if it is passed a productID
// export const createNewCart = (userId, productId) => async dispatch => {
//   try {
//     console.log('I am creatNewCart thunk')
//     const response = await axios.post(`/api/users/${userId}/cart`)
//     const newCart = response.data
//     console.log('I am a new cart', newCart)
//     // dispatch(instantiateCart(newCart))
//     dispatch(setCart(newCart))
//     if (productId) {
//       dispatch(addItemToCart(productId, newCart.id))
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

const filterHelper = (state, updatedItem) => {
  console.log('updatedItem', updatedItem)
  if (state.length > 1) {
    const filteredState = state.filter(item => item.id !== updatedItem.id)
    return [...filteredState, updatedItem]
  }

  return updatedItem
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
    case RESET_CART:
      return []
    default:
      return state
  }
}

export const cartMeta = (state = {}, action) => {
  switch (action.type) {
    case SET_META_DATA:
      return action.cartInfo
    default:
      return state
  }
}
