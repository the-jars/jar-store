const User = require('./user')
const Review = require('./reviews')
const Address = require('./address')
const Order = require('./orders')
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
User.hasMany(Address)
Address.belongsTo(User)

//Review:
Review.belongsTo(User)
User.hasMany(Review)
Review.belongsTo(Product)
Product.hasMany(Review)

// Cart:
CartItem.belongsTo(Cart)
Cart.hasMany(CartItem)
Cart.belongsTo(User)
User.hasOne(Cart)
CartItem.belongsTo(Product)

//Orders:
Order.hasOne(User)
User.belongsTo(Order)
Order.belongsToMany(Product, {through: 'OrderProduct'})
Product.belongsToMany(Order, {through: 'OrderProduct'})

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
  Product,
  Category,
  Cart,
  CartItem
}
