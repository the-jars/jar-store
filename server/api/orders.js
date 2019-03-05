const router = require('express').Router()
const {Cart, Order, OrderProduct} = require('../db/models')

// Routes for /api/orders

/** GET /api/orders/
 * - gets all the order made by every user to display them to the admin
 * - checks if user  is admin through passport
 * - TODO:
 * * Test
 */
router.get(
  '/',
  (req, res, next) =>
    req.user.isAdmin &&
    Order.findAll({include: [{all: true, nested: true}]})
      .then(orders => res.send(orders))
      .catch(next)
)

/** POST /api/orders/
 * - creates new order
 * - set cart to inactive
 * - allows non-member user to make order
 * - recieves the new order info by:
 * - req.body: {
 * * - cartId,
 * * - cartitem<Array>
 * * - userId(optional): only when order is made by user
 * * - orderInfo: {
 *      email,
 *      shippingAddressId,
 *      billingAddressId
 *     }
 * - }
 * --------------------
 * - NOTE:
 * * - prior to hitting this route, check if address exist in database
 * * - if not, create the address first and pass in their Id
 * - TODO:
 * * Test
 */
router.post('/', (req, res, next) => {
  console.log(req.body)
  Cart.findById(req.body.cartId) // finding the associated cart to set it inactive
    .then(cart => cart.update({status: 'inactive'}, {fields: ['stataus']}))
    .then(() => {
      const {email, shippingAddressId, billingAddressId} = req.body.orderInfo
      // creates a new order and returns it to next .then() chain
      return Order.create({email}).then(newOrder => newOrder)
    })
    .then(order => {
      // looping through array of cart item that is being ordered
      // - create new orderProduct instance and set the assosiation with the product
      req.body.cartitems.map(item =>
        order // create order product on each loop corresponding to the item
          .createOrderProduct({
            quantity: item.quantity
          })
          .then(orderedProduct => orderedProduct.setProduct(item.productId))
          .catch(next)
      )
      return order
      // return the order to nex then() chain after setting the product
    })
    .then(order => res.send(order)) // finally return order
    .catch(next)
})

/** GET /api/orders/myOrder
 * - gets all order made by logged in user
 * - only available if user is logged in: checks for userId
 * - calls magic method to get the associated orders
 * - TODO:
 * * Test
 */
router.get('/myorders', (req, res, next) => {
  if (req.user.id)
    return req.user
      .getOrders({
        include: [{all: true, nested: true}]
      })
      .then(orders => res.json(orders))
      .catch(next)
})

// router.get('/myorders', async (req, res, next) => {
//   try {
//     const userId = req.body.userId
//     const ordersList = await Order.findAll({
//       where: {userId: userId}
//     })

//     res.json(ordersList)
//   } catch (err) {
//     next(err)
//   }
// })

/** param for any /api/orders/ route with params=<orderId>
 * - grabs the required order and attach them to req as req.order.
 * - moves onto the preceeding route with next() after attaching the query to req
 * - moves onto error route with the thrown error when query fails
 * - TODO:
 * * Test
 */
router.param('orderId', (req, res, next, id) =>
  Order.findById(id, {include: [{all: true, nested: true}]})
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
 * - TODO:
 * * Test
 */
router.get('/filterUserOrders', async (req, res, next) => {
  try {
    let filteredOrders

    if (req.query.status === 'All') {
      filteredOrders = await Order.findAll({
        where: {userId: req.user.id},
        include: [{all: true, nested: true}]
      })
    } else {
      filteredOrders = await Order.findAll({
        where: {
          userId: req.user.id,
          shippingStatus: req.query.status
        },
        include: [{all: true, nested: true}]
      })
    }
    res.json(filteredOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/filterAdminOrders', async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      res.json('ERROR')
    }
    console.log('isAdmin?', req.user.isAdmin)
    let filteredOrders
    if (req.query.status === 'All') {
      filteredOrders = await Order.findAll({
        include: [{all: true, nested: true}]
      })
    } else {
      filteredOrders = await Order.findAll({
        where: {
          shippingStatus: req.query.status
        },
        include: [{all: true, nested: true}]
      })
    }
    res.json(filteredOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', (req, res, next) => res.send(req.order))

module.exports = router
