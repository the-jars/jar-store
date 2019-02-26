const router = require('express').Router()
const {Product, Category} = require('../db/models/index.js')

// param for getting the required product
router.param('id', (req, res, next, id) =>
  Product.findById(id, {include: [Category]})
    .then(product => {
      req.product = product
      next()
    })
    .catch(next)
)

// GET /api/products/:id
/** TODO: fix to utilize param */
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

// for updating existing product
router.put('/:id', (req, res, next) => {
  const updateField = req.body
  req.product
    .update(updateField)
    .then(updatedProduct => res.status(201).send(updatedProduct))
    // handle when user is not admin
    .catch(next)
})
/**
 * used for creating new product
 */
router.post('/', (req, res, next) => {
  const createField = req.body
  Product.create(createField)
    .then(createdProduct => res.status(201).send(createdProduct))
    .catch(next)
})

module.exports = router
