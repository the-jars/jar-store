const router = require('express').Router()
const {Category} = require('../db/models/product')
const {Product} = require('../db/models/product')

// GET /api/categories/
router.get('/', async (req, res, next) => {
  // Category.findAll()
  //   .then(categories => res.send(categories))
  //   .catch(next)
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name
    })
    res.json(newCategory)
  } catch (err) {
    next(err)
  }
})

// GET /api/categories/filter
router.get('/filterProduct', async (req, res, next) => {
  try {
    let filteredProducts
    if (req.query.filter === 'All') {
      filteredProducts = await Product.findAll()
    } else {
      const filterCategory = await Category.findOne({
        where: {
          name: req.query.filter
        }
      })
      filteredProducts = await filterCategory.getProducts()
    }
    res.json(filteredProducts)
  } catch (error) {
    next(error)
  }
})

module.exports = router
