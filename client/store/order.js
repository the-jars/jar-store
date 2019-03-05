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
// ACTION TYPES
const SET_USER_ORDERS = 'SET_USER_ORDERS'
const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'
const SET_ADMIN_ORDERS = 'SET_ADMIN_ORDERS'

// ACTION CREATORS
export const setUserOrders = orderList => ({
  type: SET_USER_ORDERS,
  orderList
})

export const setCurrentOrder = currentOrder => ({
  type: SET_CURRENT_ORDER,
  currentOrder
})

export const setAdminOrders = orderList => ({
  type: SET_ADMIN_ORDERS,
  orderList
})

// THUNKS
export const fetchSingleOrder = orderId => async dispatch => {
  try {
    console.log('hey!!!!!!', orderId)
    const currentOrder = await axios.get(`/api/orders/${orderId}`)
    dispatch(setCurrentOrder(currentOrder.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchUserOrders = () => async dispatch => {
  try {
    const userOrders = await axios.get('/api/orders/myorders')
    dispatch(setUserOrders(userOrders.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchAdminOrders = () => async dispatch => {
  try {
    const orderList = await axios.get('/api/orders/')
    dispatch(setAdminOrders(orderList.data))
  } catch (error) {
    console.error(error)
  }
}

export const filterUserOrders = status => async dispatch => {
  try {
    const filteredOrderList = await axios.get(
      `/api/orders/filterUserOrders?status=${status}`
    )
    dispatch(setUserOrders(filteredOrderList.data))
  } catch (error) {
    console.error(error)
  }
}

export const filterAdminOrders = status => async dispatch => {
  try {
    const filteredOrderList = await axios.get(
      `/api/orders/filterAdminOrders?status=${status}`
    )
    dispatch(setAdminOrders(filteredOrderList.data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCERS

export const userOrderList = (state = [], action) => {
  switch (action.type) {
    case SET_USER_ORDERS:
      return action.orderList
    default:
      return state
  }
}

export const currentOrder = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return action.currentOrder
    default:
      return state
  }
}

export const adminOrderList = (state = [], action) => {
  switch (action.type) {
    case SET_ADMIN_ORDERS:
      return action.orderList
    default:
      return state
  }
}
