const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingStatus: {
    type: Sequelize.ENUM('Processing', 'Shipped', 'Delivered', 'Canceled'),
    defaultValue: 'Processing'
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  totalCost: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0
  },
  sessionId: Sequelize.STRING
})

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = {Order, OrderProduct}
