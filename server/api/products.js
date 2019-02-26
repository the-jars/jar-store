const router = require('express').Router()
const {Product, Category} = require('../db/models/index.js')

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findById(req.params.id, {
      include: [Category]
    })
    console.log(singleProduct.availability)
    if (!singleProduct) {
      res.sendStatus(404)
    }
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
