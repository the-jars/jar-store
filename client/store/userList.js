import axios from 'axios'

export const SET_USERS = 'SET_USERS'
export const MAKE_ADMIN = 'MAKE_ADMIN'
export const DELETE_USER = 'DELETE_USER'

export const deleteUser = user => ({
  type: DELETE_USER,
  user
})

export const makeAdmin = user => ({
  type: MAKE_ADMIN,
  user
})

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

export const updateAdmin = userId => async dispatch => {
  try {
    const {data: updatedUser} = await axios.put(`/api/users/${userId}`)
    dispatch(makeAdmin(updatedUser[0]))
  } catch (err) {
    console.error(err)
  }
}

export const allUsers = (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case MAKE_ADMIN:
      return state.map(user => {
        if (user.id === action.user.id) {
          user.isAdmin = true
          return user
        } else {
          return user
        }
      })
    default:
      return state
  }
}
