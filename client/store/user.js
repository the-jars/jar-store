import axios from 'axios'
import history from '../history'
import {fetchCartItems, fetchCartInfo, createNewCart, setCart} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// const SET_USER = 'SET_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
// const setUser = user => ({type: SET_USER, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    console.log('I am auth res in me', res)
    dispatch(getUser(res.data || defaultUser))
    //const cart = await axios.get('/api/carts', { userId })
    if (res.data.id) {
      dispatch(fetchCartItems(res.data.id))
      dispatch(fetchCartInfo(res.data.id))
    } else {
      dispatch(createNewCart('null'))
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    console.log('I am a user object', res.data)
    dispatch(getUser(res.data))
    dispatch(fetchCartInfo(res.data.id))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    dispatch(createNewCart('null'))
    dispatch(setCart([]))
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// export const fetchUser = userId => async dispatch => {
//   try {
//     const {data: user} = await axios.post(`/api/users/${userId}`)
//     dispatch(setUser(user))
//   } catch (error) {
//     console.error(error)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
