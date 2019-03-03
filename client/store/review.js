import axios from 'axios'

export const SUBMIT_REVIEW = 'SUBMIT_REVIEW'
export const SHOW_ADD_REVIEW = 'SHOW_ADD_REVIEW'

const initialState = {
  reviews: [],
  selectedReview: {},
  showReviewForm: false
}

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

export const reviews = (state = initialState, action) => {
  switch (action.type) {
    // case SUBMIT_REVIEW:
    // return {
    //   ...state, ratings:
    // }
    case SHOW_ADD_REVIEW:
      return {
        ...state,
        showAddReview: !state.showAddReview
      }
    default:
      return state
  }
}
