import axios from 'axios'

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
    const currentOrder = await axios.get(`/api/orders/${orderId}`)
    dispatch(setCurrentOrder(currentOrder.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchUserOrders = () => async dispatch => {
  try {
    const userOrders = await axios.get('/api/orders/myorders')
    if (userOrders.data.status !== 403) dispatch(setUserOrders(userOrders.data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchAdminOrders = () => async dispatch => {
  try {
    const orderList = await axios.get('/api/orders/')
    if (orderList.data.status !== 403) dispatch(setAdminOrders(orderList.data))
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

export const createOrder = (
  cartId,
  cartItems,
  shippingAddress,
  billingAddress,
  email,
  total,
  history
) => async dispatch => {
  try {
    const shippingRes = await axios.put('/api/address/', shippingAddress)
    const billingRes = await axios.put('/api/address/', billingAddress)
    const orderInfo = {
      cartId,
      cartItems,
      email,
      shippingAddressId: shippingRes.data,
      billingAddressId: billingRes.data,
      total
    }

    const createOrderRes = await axios.post(`/api/orders/`, orderInfo)
    await dispatch(setCurrentOrder(createOrderRes.data))
    history.push(`/myorders/${createOrderRes.data.id}`)
  } catch (e) {
    console.error(e)
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
