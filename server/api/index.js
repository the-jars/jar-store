const router = require('express').Router()

module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/carts', require('./carts'))
router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))
router.use('/address', require('./address'))
router.use('/stripe', require('./stripe'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
