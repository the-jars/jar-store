const router = require('express').Router()
const {Review} = require('../db/models')

router.get('/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.productId
      }
    })
    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

module.exports = router

router.post('/:productId/:userId', async (req, res, next) => {
  try {
    const newReview = await Review.create({
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      productId: req.params.productId,
      userId: req.params.userId
    })
    res.json(newReview)
  } catch (error) {
    next(error)
  }
})
