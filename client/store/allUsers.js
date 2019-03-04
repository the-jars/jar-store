import axios from 'axios'

export const SET_USERS = 'SET_USERS'

export const setUsers = users => ({
  type: SET_USERS,
  users
})

export const fetchUsers = () => async dispatch => {
  try {
    const {data: users} = await axios.get('/api/users/')
    dispatch(setUsers(users))
  } catch (err) {
    console.error(err)
  }
}

export const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
