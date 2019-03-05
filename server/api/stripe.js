const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
const router = require('express').Router()

router.post('/charge', async (req, res, next) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge - you got some jars',
      source: req.body
    })
    res.json(status)
  } catch (err) {
    next(err)
  }
})

module.exports = router
