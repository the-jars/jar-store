const router = require('express').Router()
const sequelize = require('sequelize')
const {Product} = require('../db/models.index.js')

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findById(req.params.id)
    if (!singleProduct) {
      res.sendStatus(500)
    }
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
