const router = require('express').Router()
const {Product, Category} = require('../db/models/index.js')

/**
 * POST /api/products/
 * for creating new product
 * TODO:
 * handle when user is not admin through passport
 */
router.post('/', (req, res, next) =>
  Product.create(req.body)
    .then(createdProduct => res.status(201).send(createdProduct))
    .catch(next)
)

// param route for getting the required product when id parameter is provided
// attaches product to the request and moves on to the next route
// with the matching html request
router.param('id', (req, res, next, id) =>
  Product.findById(id, {include: [{all: true, nested: true}]})
    .then(product => {
      req.product = product
      next()
      return null
    })

    /**
     * sends 404 error to the error route
     * TODO:
     * corresponding error handling
     * for not found
     */
    .catch(next)
)

/**
 * GET /api/products/:id
 * acquire individual product
 * used in SingleProduct component
 * TODO:
 * fix to utilize param
 */
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

/**
 * PUT /api/products/:id
 * for updating existing product
 * acquired in router.param('id')
 * TODO:
 * handle when user is not admin through passport
 */
router.put('/:id', (req, res, next) =>
  req.product
    .update(req.body, {
      fields: [
        'name',
        'price',
        'size',
        'flavor',
        'description',
        'inventory',
        'available'
      ]
    })
    .then(updatedProduct => res.status(201).send(updatedProduct))
    /**
     * TODO:
     * corresponding error handling
     */
    .catch(next)
)

module.exports = router
