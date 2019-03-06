import axios from 'axios'

const SET_CATEGORIES = 'SET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})

export const addCategory = category => ({
  type: ADD_CATEGORY,
  category
})

export const fetchCategories = () => async dispatch => {
  axios
    .get('/api/categories')
    .then(res => {
      console.log(res.data)
      dispatch(setCategories(res.data))
    })
    .catch(console.log)
}

export const addCategoryThunk = newCategoryInfo => dispatch => {
  axios
    .post(`/api/categories`, newCategoryInfo)
    .then(res => dispatch(addCategory(res.data)))
    .catch(console.log)
}

export const categories = (state = [], action) => {
  if (action.type === SET_CATEGORIES) {
    return action.categories
  } else if (action.type === ADD_CATEGORY) {
    return [...state, action.category]
  }
  return state
}
