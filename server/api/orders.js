const router = require('express').Router()
const {Cart, Order, OrderProduct, Address} = require('../db/models')

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
 * * - cartItems<Array>
 * * - orderInfo: {
 *      email,
 *      shippingAddressId,
 *      billingAddressId,
 *      price
 *     }
 * - }
 * --------------------
 * - NOTE:
 * * - prior to hitting this route, check if address exist in database
 * * - if not, create the address first and pass in their Id
 * - TODO:
 * * Test
 */
router.post(
  '/',
  (req, res, next) =>
    Cart.findById(req.body.cartId) // finding the associated cart
      // then inactivate the found cart
      .then(cart => cart.update({status: 'inactive'}, {fields: ['stataus']}))
      // then create the order
      .then(() => {
        const {email} = req.body.orderInfo
        return Order.create({email}).then(newOrder => newOrder) // pass the created order to the next .then() chain
      })
      // then,
      // - looping through array of cart item that is being ordered
      // - create new orderProduct instance and set the assosiation with the product
      .then(order => {
        req.body.cartItems.map(item =>
          order // create order product on each loop corresponding to the item
            .createOrderProduct({
              quantity: item.quantity
            })
            .then(orderedProduct => orderedProduct.setProduct(item.productId))
            .catch(next)
        )
        return order // return the order to next then() chain after setting the product
      })
      // then set the shipping address association
      .then(order => {
        const {shippingAddressId} = req.body.orderInfo
        return order.setShippingAddress(shippingAddressId).then(() => order)
      })
      // then set the billing address association
      .then(order => {
        const {billingAddressId} = req.body.orderInfo
        return order.setBillingAddress(billingAddressId).then(() => order)
      })
      // then set user association
      .then(
        order =>
          req.user && req.user.id
            ? order.setUser(req.user.id, {returning: true}).then(returned => {
                console.log(returned)
                return order
              })
            : order.update(
                {sessionId: req.session.id},
                {returning: true, fields: ['sessionId']}
              )
      )
      // then finally return order
      .then(order => res.send(order))
      .catch(next) // move onto error handler on error
)

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
