const router = require('express').Router()
const {Product, Category} = require('../db/models/index.js')

// POST /api/products/
// for creating new product
/**TODO
 * handle when user is not admin
 * through session data
 */
router.post('/', (req, res, next) =>
  Product.create(req.body)
    .then(createdProduct => res.status(201).send(createdProduct))
    .catch(next)
)

// param for getting the required product
router.param('id', (req, res, next, id) =>
  Product.findById(id, {include: [{all: true, nested: true}]})
    .then(product => {
      req.product = product
      next()
      return null
    })
    .catch(next)
)

// GET /api/products/:id
// acquire individual product
// used in SingleProduct component
/** TODO
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

// PUT /api/products/:id
// for updating existing product
/**TODO
 * handle when user is not admin
 * through session data
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
    .catch(next)
)

module.exports = router
