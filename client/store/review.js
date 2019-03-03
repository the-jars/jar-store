import axios from 'axios'

export const SUBMIT_REVIEW = 'SUBMIT_REVIEW'

const initialState = {
  reviews: [],
  selectedReview: {},
  showReviewForm: false
}

export const addReview = newReview => ({
  type: SUBMIT_REVIEW,
  newReview
})

export const addNewReview = (
  reviewData,
  productId,
  userId
) => async dispatch => {
  try {
    const {data: newReview} = await axios.post(
      `/api/reviews/${productId}/${userId}`
    )
    dispatch(addReview(newReview))
  } catch (err) {
    console.error(err)
  }
}
