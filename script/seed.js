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
  productData,
  categoryData,
  // productCategoryData,
  reviewData,
  orderData,
  userData,
  orderProductData
} = require('../server/db/seedData.js')
const {OrderProduct} = require('../server/db/models/orders')

const seed = db
  .sync({force: true})
  .then(() => {
    console.log('Database synced!')
    return Promise.all([
      User.bulkCreate(userData, {returning: true}),
      Review.bulkCreate(reviewData, {returning: true}),
      Category.bulkCreate(categoryData, {returning: true}),
      Product.bulkCreate(productData, {returning: true}),
      Order.bulkCreate(orderData, {returning: true}),
      Address.bulkCreate(addressData, {returning: true}),
      OrderProduct.bulkCreate(orderProductData, {returning: true})
    ])
  })
  .then(insertedData => {
    const [
      users,
      reviews,
      categories,
      products,
      orders,
      addresses,
      orderproducts
    ] = insertedData
    const [one, two, three, four, five, six, seven, eight] = reviews
    const [a, b, c, d, e, f, g] = users
    const [p1, p2, p3, p4, p5, p6, p7, p8, p9] = products
    const [salsa, jelly, nutbutter] = categories
    console.log(categories)
    const [op1, op2, op3, op4, op5, op6, op7] = orderproducts
    const [o1, o2, o3] = orders

    // Here we're using Sequelize's 'Magic' methods to set associations.
    // Each one returns a promise, so we must wrap them in Promise.all
    // to return a single promise that will resolve when they all complete
    return Promise.all([
      one.setUser(a),
      two.setUser(b),
      three.setUser(c),
      four.setUser(d),
      five.setUser(e),
      six.setUser(f),
      seven.setUser(e),
      eight.setUser(d),
      one.setProduct(p1),
      two.setProduct(p3),
      three.setProduct(p3),
      four.setProduct(p4),
      five.setProduct(p5),
      six.setProduct(p6),
      seven.setProduct(p5),
      eight.setProduct(p9),
      jelly.setProducts([p1, p2, p3, p9, p8]),
      nutbutter.setProducts([p4, p5, p9]),
      salsa.setProducts([p7, p8]),
      op1.setProduct(p1),
      op2.setProduct(p2),
      op3.setProduct(p3),
      op1.setOrder(o1),
      op2.setOrder(o2),
      op3.setOrder(o3)
      //orderproduct.setProduct()
      //orderProduct.setOrder()
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

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
// async function runSeed() {
//   console.log('seeding...')
//   try {
//     await seed()
//   } catch (err) {
//     console.error(err)
//     process.exitCode = 1
//   } finally {
//     console.log('closing db connection')
//     await db.close()
//     console.log('db connection closed')
//   }
// }

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
// if (module === require.main) {
//   runSeed()
// }

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
