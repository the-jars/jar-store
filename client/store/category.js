import axios from 'axios'

const SET_CATEGORIES = 'SET_CATEGORIES'

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch =>
  axios
    .get('api/categories')
    .then(response => dispatch(setCategories(response.data)))
    .catch(console.log)

export const categories = (state = [], action) => {
  if (action.type === SET_CATEGORIES) {
    return action.categories
  }
  return state
}
