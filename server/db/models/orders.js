const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
   shippingStatus: {
     type: Sequelize.ENUM('Processing', 'Shipped','Delivered', 'Canceled'),
     defaultValue: "Processing",
     allowNull: false,
   }
})

//Order.hasOne(User);
//User.belongsTo(Order);

//Order.belongsToMany(Product, through: "OrderProduct")
//Product.belongsToMany(Order, through: "OrderProduct")
module.exports = Order
