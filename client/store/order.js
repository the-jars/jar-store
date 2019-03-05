import axios from 'axios'

const SET_ORDER = 'SET_ORDER'

export const setOrder = order => ({
  type: SET_ORDER,
  order
})

export const fetchOrder = orderId => dispatch =>
  axios
    .get(`/api/orders/${orderId}`)
    .then(res => dispatch(setOrder(res.data)))
    .catch(console.error)

export const createOrder = (cart, orderInfo) => dispatch => {
  const newOrder = {
    cartId: cart.id,
    cartItems: cart.cartitems,
    orderInfo
  }
  return axios
    .post(`/api/orders/`, newOrder)
    .then(res => dispatch(setOrder(res.data)))
    .catch(console.error)
}

export default function(state = {}, action) {
  if (action.type === SET_ORDER) return action.order
  return state
}
