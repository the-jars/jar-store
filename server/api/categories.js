const router = require('express').Router()
const {Category} = require('../db/models/index.js')

// GET /api/categories/filter
router.get('/:filter', async (req, res, next) => {
  try {
    console.log(req.body)
    const filterCategory = await Category.findOne({
      where: {
        name: req.params.filter
      }
    })
    const filteredProducts = await filterCategory.getProducts()
    res.json(filteredProducts)
  } catch (error) {
    next(error)
  }
})

// GET /api/categories/
router.get('/', (req, res, next) =>
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next)
)

module.exports = router
