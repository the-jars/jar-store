import axios from 'axios'

export const SUBMIT_REVIEW = 'SUBMIT_REVIEW'
export const SHOW_ADD_REVIEW = 'SHOW_ADD_REVIEW'
export const SET_REVIEWS = 'SET_REVIEWS'
export const SET_SELECTED_REVIEW = 'SET_SELECTED_REVIEW'

const initialState = {
  reviews: [],
  selectedReview: {},
  showReviewForm: false
}

export const setReviews = reviews => ({
  type: SET_REVIEWS,
  reviews
})

export const setSelectedReview = review => ({
  type: SET_SELECTED_REVIEW,
  review
})

export const addReview = newReview => ({
  type: SUBMIT_REVIEW,
  newReview
})

export const showAddReview = () => ({
  type: SHOW_ADD_REVIEW
})

export const addNewReview = (
  reviewData,
  productId,
  userId
) => async dispatch => {
  try {
    const {data: newReview} = await axios.post(
      `/api/reviews/${productId}/${userId}`,
      reviewData
    )
    dispatch(addReview(newReview))
  } catch (err) {
    console.error(err)
  }
}

export const getReviews = productId => async dispatch => {
  try {
    const {data: reviews} = await axios.get(`/api/reviews/${productId}`)
    dispatch(setReviews(reviews))
  } catch (err) {
    console.error(err)
  }
}

export const reviews = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_REVIEW:
      return {
        ...state,
        ratings: [...state.reviews, action.newReview]
      }
    case SET_REVIEWS:
      return {...state, reviews: action.reviews}
    case SHOW_ADD_REVIEW:
      return {
        ...state,
        showAddReview: !state.showAddReview
      }
    default:
      return state
  }
}
