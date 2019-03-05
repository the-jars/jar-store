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

export const createOrder = (
  cart,
  shippingAddress,
  billingAddress,
  email
) => async dispatch => {
  try {
    const shippingRes = await axios.put('/api/address/', shippingAddress)
    const billingRes = await axios.put('/api/address/', billingAddress)

    const newOrder = {
      cartId: cart.id,
      cartItems: cart.cartitems,
      orderInfo: {
        email,
        shippingAddressId: shippingRes.data,
        billingAddressId: billingRes.data
      }
    }

    const createOrderRes = await axios.post(`/api/orders/`, newOrder)
    //dispatch(setOrder(createOrderRes.data))
  } catch (e) {
    console.error(e)
  }
}

export default function(state = {}, action) {
  if (action.type === SET_ORDER) return action.order
  return state
}
