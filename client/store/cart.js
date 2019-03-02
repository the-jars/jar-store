import axios from 'axios'

// ACTION TYPES
const SET_CART = 'SET_CART'
const UPDATE_QTY = 'UPDATE_QTY'
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

export const addedItemToCart = (productId, cartId) => ({
  type: ADDED_ITEM_TO_CART,
  productId: productId,
  cartId: cartId
})

//check to see if cart exists
//if it does, we run xyz
//if no, we create cart and then call the thunk that adds item to it

export const deleteItem = itemToDelete => ({
  type: DELETE_ITEM,
  itemToDelete
})

export const updateQty = updatedCartItem => ({
  type: UPDATE_QTY,
  updatedCartItem
})

// THUNKS
// - for fetching all items in carts
export const fetchCartItems = userId => async dispatch => {
  try {
    const cart = await axios.get(`/api/carts/${userId}`)
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
export const fetchCartInfo = userId => async dispatch => {
  try {
    const cartInfo = await axios.post(`/api/carts`, userId)
    dispatch(instantiateCart(cartInfo))
  } catch (error) {
    console.error(error)
  }
}

// export const addItemToCart = () => async dispatch => {
//   // try {
//   // } catch (err) {
//   //   console.error(err)
//   // }
// }

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
    case INSTANTIATE_CART:
      return action.cartInfo
    default:
      return state
  }
}
