'use strict'

const db = require('../server/db')
const {
  User,
  Review,
  Category,
  Product,
  Order,
  Cart,
  Address
} = require('../server/db/models')

const {
  addressData,
  productData,
  categoryData,
  productCategoryData,
  // reviewData,
  orderData,
  userData
} = require('../server/db/seedData.js')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all(
    userData.map(user =>
      User.create(user, {
        // include: [{model: Address}]
      })
    )
  )
  const orders = await Promise.all(
    orderData.map(order =>
      Order.create(order, {
        include: []
      })
    )
  )
  // const reviews = await Promise.all(
  //   reviewData.map(review =>
  //     Review.create(review, {
  //       include: []
  //     })
  //   )
  // )
  const categories = await Promise.all(
    categoryData.map(category =>
      Category.create(category, {
        include: []
      })
    )
  )
  const products = await Promise.all(
    productData.map(product =>
      Product.create(product, {
        include: []
      })
    )
  )
  const addresses = await Promise.all(
    addressData.map(address =>
      Address.create(address, {
        // include: [{model: User}]
      })
    )
  )
  //order.create: productid as another field and quantity

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
