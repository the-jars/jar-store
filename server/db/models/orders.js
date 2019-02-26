const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingStatus: {
    type: Sequelize.ENUM('Processing', 'Shipped', 'Delivered', 'Canceled'),
    defaultValue: 'Processing',
    allowNull: false
  }
})

module.exports = Order
