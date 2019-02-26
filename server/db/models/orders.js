const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingStatus: {
    type: Sequelize.ENUM('Processing', 'Shipped', 'Delivered', 'Canceled'),
    defaultValue: 'Processing',
    allowNull: false
  }
})

const OrderProduct = db.define('orderProduct', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = {Order, OrderProduct}
