const router = require('express').Router()
const {Category} = require('../db/models/index.js')
const {Product} = require('../db/models/product')
//GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    // if (!products) {
    //   res.sendStatus(404)
    // }
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findById(req.params.id, {
      include: [Category]
    })
    if (!singleProduct) {
      res.sendStatus(404)
    }
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
