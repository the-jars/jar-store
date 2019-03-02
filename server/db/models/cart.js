const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: Sequelize.ENUM('active', 'inactive'),
    defaultValue: 'active',
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  sessionId: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

const CartItem = db.define('cartitem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = {Cart, CartItem}
