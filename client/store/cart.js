import axios from 'axios'

// ACTION TYPES
const SET_CART = 'SET_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_QTY = 'UPDATE_QTY'

// ACTION CREATORS
// - for setting the cart of [...cartitems]
export const setCart = cart => ({
  type: SET_CART,
  cart
})

export const deleteItem = itemToDelete => ({
  type: DELETE_ITEM,
  itemToDelete
})

export const updateQty = updatedCart => ({
  type: UPDATE_QTY,
  updatedCart
})

// THUNKS
// - for fetching all items in carts
export const fetchCartItems = userId => async dispatch => {
  try {
    const cart = await axios.get(`/api/allcarts/${userId}`)
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

export const putItemQty = editedCartItem => async dispatch => {
  try {
    const {data: updatedCartItem} = await axios.put(
      `/api/carts/${editedCartItem.cartId}/${editedCartItem.id}`,
      editedCartItem
    )
    dispatch(updateQty(updatedCartItem))
  } catch (err) {
    console.error(err)
  }
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
    case UPDATE_QTY:
      return state.map(item => {
        if (item.id === action.updatedCart.id) {
          item.quantity = action.updatedCart.quantity
        }
        return item
      })
    default:
      return state
  }
}
