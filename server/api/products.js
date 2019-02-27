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

/**
 * POST /api/products/
 * for creating new product
 * *****
 * TODO:
 * handle when user is not admin through passport
 */
router.post('/', (req, res, next) =>
  Product.create(req.body)
    .then(createdProduct => res.status(201).send(createdProduct))
    .catch(next)
)

router.post('/', async (req, res, next) => {
  try {
    const createdProduct = Product.create({
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      flavor: req.body.flavor,
      description: req.body.description,
      inventory: req.body.inventory,
      availability: req.body.availability
    })
    res.json(createdProduct)
  } catch (err) {
    next(err)
  }
})

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
     * *****
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
 * *****
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
 * *****
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
