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
  sessionId: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

const CartItem = db.define('cartitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
})

module.exports = {Cart, CartItem}
