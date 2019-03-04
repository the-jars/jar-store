import axios from 'axios'

// ACTION TYPES
const SET_USER_ORDERS = 'SET_USER_ORDERS'
const SET_ADMIN_ORDERS = 'SET_ADMIN_ORDERS'

// ACTION CREATORS
export const setUserOrders = orderList => ({
  type: SET_USER_ORDERS,
  orderList
})

export const setAdminOrders = orderList => ({
  type: SET_ADMIN_ORDERS,
  orderList
})

// THUNKS
export const fetchSingleOrder = orderId => async dispatch => {
  try {
    // TODO: HIT ALEX'S EXPRESS ROUTE
    dispatch()
  } catch (error) {
    console.error(error)
  }
}

export const fetchUserOrders = userId => async dispatch => {
  try {
    // TODO: HIT ALEX'S EXPRESS ROUTE
    dispatch(setUserOrders(orderList))
  } catch (error) {
    console.error(error)
  }
}

export const fetchAdminOrders = () => async dispatch => {
  try {
    const orderList = axios.get('/api/orders')
    dispatch(setAdminOrders(orderList))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
export const userOrders = (state = [], action) => {
  switch (action.type) {
    case SET_USER_ORDERS:
      return action.ordersList
    default:
      return state
  }
}
export const adminOrders = (state = [], action) => {
  switch (action.type) {
    case SET_ADMIN_ORDERS:
      return action.orderList
    default:
      return state
  }
}
