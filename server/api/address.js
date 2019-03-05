const router = require('express').Router()
module.exports = router
const {Address} = require('../db/models')

router.put('/', async (req, res, next) => {
  try {
    const address = await Address.findOrCreate({
      where: {
        line_1: req.body.line_1,
        line_2: req.body.line_2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      }
    })
    res.json(address[0].id)
  } catch (error) {
    next(error)
  }
})
