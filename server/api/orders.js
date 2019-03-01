const router = require('express').Router()
const {Order, OrderProduct} = require('../db/models')

// Routes for /api/orders

/** GET /api/orders/
 * - gets all the order made by every user to display them to the admin
 */
router.get('/', (req, res, next) =>
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next)
)

/** param for any /api/orders/ route with params=<orderId>
 * - grabs the required order and attach them to req as req.order.
 * - moves onto the preceeding route with next() after attaching the query to req
 * - moves onto error route with the thrown error when query fails
 */
router.param('orderId', (req, res, next, id) =>
  Order.findById(id, {include: [OrderProduct]})
    .then(order => {
      req.order = order
      next()
      return null
    })
    .catch(next)
)

/** GET /api/orders/:orderId
 * - responds to the client with found order on param
 * - query error being handled on param.
 */
router.get('/:orderId', (req, res, next) => res.send(req.order))
