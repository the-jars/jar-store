const User = require('./user')
const Review = require('./reviews')
const Address = require('./address')
const {Order, OrderProduct} = require('./orders')
const {Product, Category} = require('./product')
const {Cart} = require('./cart')
const {CartItem} = require('./cart')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// User & Address:
Address.hasMany(User)
User.belongsTo(Address)

//Review:
Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Product)
Product.hasMany(Review)

// Cart:
CartItem.belongsTo(Cart)
Cart.hasMany(CartItem)
Cart.belongsTo(User)
User.hasMany(Cart)
CartItem.belongsTo(Product)

//Orders:
Order.belongsTo(User)
User.hasMany(Order)

// has two types of address
Order.belongsTo(Address, {
  as: 'shippingAddress',
  constraints: false,
  allowNull: true,
  defaultValue: null
})
Order.belongsTo(Address, {
  as: 'billingAddress',
  constraints: false,
  allowNull: true,
  defaultValue: null
})

//OrderProducts:
OrderProduct.belongsTo(Order)
Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)
Product.hasMany(OrderProduct)

// Products:
Product.belongsToMany(Category, {through: 'ProductCategory'})
Category.belongsToMany(Product, {through: 'ProductCategory'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Address,
  Review,
  Order,
  OrderProduct,
  Product,
  Category,
  Cart,
  CartItem
}
