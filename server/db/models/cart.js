const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

const CartItem = db.define('cartitems', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = (Cart, CartItem)

// ASSOCIATIONS
//CartItem.belongsTo(Cart)
//Cart.hasMany(CartItem)
//Cart.belongsTo(User)
//User.hasMany(Cart)
//CartItem.belongsTo(Product)
//Product.hasMany(CartItem)
