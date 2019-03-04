import axios from 'axios'

// ACTION TYPES
const SET_CART = 'SET_CART'
const RESET_CART = 'RESET_CART'
const SET_META_DATA = 'SET_META_DATA'
const UPDATE_QTY = 'UPDATE_QTY'
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

export const updateQty = updatedCartItem => ({
  type: UPDATE_QTY,
  updatedCartItem
})

// THUNKS
// - for fetching all items in carts along with metadata
export const fetchCartInfo = userId => async dispatch => {
  try {
    if (!userId) {
      userId = 'null'
    }
    const cartInfo = await axios.post(`/api/carts/${userId}`)
    dispatch(setCart(cartInfo.data.items))
    dispatch(setMetaData(cartInfo.data.cart))
  } catch (error) {
    console.error(error)
  }
}
// - for deleting one item from the array
export const deleteCartItem = itemToDelete => dispatch => {
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

export const putItemQty = (editedCartItem, value) => async dispatch => {
  try {
    const {data: updatedCartItem} = await axios.put(
      `/api/carts/${editedCartItem.cartId}/${editedCartItem.productId}`,
      {value}
    )
    dispatch(updateQty(updatedCartItem[0]))
  } catch (err) {
    console.error(err)
  }
}

export const addItemToCart = (productId, cartId) => async dispatch => {
  try {
    if (!cartId === undefined) {
      cartId = 'null'
    }
    const response = await axios.post(
      `/api/carts/${cartId}/products/${productId}`
    )
    const cartItem = response.data
    dispatch(addedItemToCart(cartItem))
  } catch (error) {
    console.error(error)
  }
}

// Helper function for updating state with a new quantity of an item
const filterHelper = (state, updatedItem) => {
  if (state.length > 1) {
    const filteredState = state.filter(item => item.id !== updatedItem.id)
    return [...filteredState, updatedItem]
  }

  return [updatedItem]
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
    case UPDATE_QTY:
      return state.map(item => {
        if (item.id === action.updatedCartItem.id) {
          item.quantity = action.updatedCartItem.quantity
        }
        return item
      })
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
