'use strict'

const db = require('../server/db')

const {
  User,
  Review,
  Category,
  Product,
  Order,
  Address
} = require('../server/db/models')

const {
  addressData,
  //productData,
  categoryData,
  // productCategoryData,
  reviewData,
  orderData,
  userData,
  orderProductData,
  cartData,
  cartItemData
} = require('../server/db/seedData.js')

const {
  butterData,
  jellyData,
  salsaData,
  butterJellyData
} = require('../server/db/seedData2')

const {OrderProduct} = require('../server/db/models/orders')
const {Cart, CartItem} = require('../server/db/models/cart')

const seed = db
  .sync({force: true})
  .then(() => {
    console.log('Database synced!')
    return Promise.all([
      User.bulkCreate(userData, {returning: true}),
      Review.bulkCreate(reviewData, {returning: true}),
      Category.bulkCreate(categoryData, {returning: true}),
      Product.bulkCreate(butterData, {returning: true}),
      Product.bulkCreate(jellyData, {returning: true}),
      Product.bulkCreate(salsaData, {returning: true}),
      Product.bulkCreate(butterJellyData, {returning: true}),
      Order.bulkCreate(orderData, {returning: true}),
      Address.bulkCreate(addressData, {returning: true}),
      OrderProduct.bulkCreate(orderProductData, {returning: true}),
      Cart.bulkCreate(cartData, {returning: true}),
      CartItem.bulkCreate(cartItemData, {returning: true})
    ])
  })
  .then(insertedData => {
    const [
      users,
      reviews,
      categories,
      butters,
      jellies,
      salsas,
      butterJellies,
      orders,
      addresses,
      orderproducts,
      carts,
      cartitems
    ] = insertedData

    const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = butters
    const [salsa, jelly, nutbutter] = categories
    const [op1, op2, op3, op4, op5, op6, op7] = orderproducts
    const [o1, o2, o3] = orders

    return Promise.all([
      reviews.forEach(function(review, idx) {
        review.setUser(
          users[idx] ? users[idx] : users[users.length - (idx - 1)]
        )
        review.setProduct(butters[idx])
      }),

      orders.forEach(function(order, idx) {
        order.setUser(users[idx])
      }),

      op1.setProduct(p1),
      op2.setProduct(p2),
      op3.setProduct(p3),

      op1.setOrder(o1),
      op2.setOrder(o2),
      op3.setOrder(o3),

      jelly.setProducts(jellies),
      nutbutter.setProducts(butters),
      salsa.setProducts(salsas),
      nutbutter.setProducts(butterJellies),
      jelly.setProducts(butterJellies),

      cartitems.forEach(function(cartItem, idx) {
        cartItem.setCart(
          carts[idx] ? carts[idx] : carts[carts.length - (idx - 1)]
        )
        cartItem.setProduct(butters[idx])
      })
    ])
  })
  .then(() => {
    console.log('Database seeded!')
  })
  .catch(err => {
    console.log('Disaster! Something went wrong!')
    console.log(err)
  })
  .finally(() => {
    console.log('Closing database connection.')
    db.close()
  })
module.exports = seed

//DO NOT DELETE -- WE WILL NEED THIS AGAIN WHEN DATA SIZE INCREASES
// const [one, two, three, four, five, six, seven, eight] = reviews
// const [a, b, c, d, e, f, g] = users
// const [c1, c2, c3, c4] = carts
// const [ci1, ci2, ci3, ci4, ci5, ci6] = cartitems

// c1.setUser(a),
// c2.setUser(b),
// c3.setUser(c),
// c4.setUser(a),

// ci1.setCart(c1),
// ci1.setProduct(p1),
// ci2.setCart(c1),
// ci2.setProduct(p2),

// ci3.setCart(c2),
// ci3.setProduct(p2),

// ci4.setCart(c2),
// ci4.setProduct(p1),

// ci5.setCart(c3),
// ci5.setProduct(p1),
// ci6.setCart(c3),
// ci6.setProduct(p2)

// one.setUser(a),
// two.setUser(b),
// three.setUser(c),
// four.setUser(d),
// five.setUser(e),
// six.setUser(f),
// seven.setUser(e),
// eight.setUser(d),

// one.setProduct(p1),
// two.setProduct(p3),
// three.setProduct(p3),
// four.setProduct(p4),
// five.setProduct(p5),
// six.setProduct(p6),
// seven.setProduct(p5),
// eight.setProduct(p9),

// cartitems.forEach(function(cartItem, idx) => cartItem.setProduct(product[idx]))
