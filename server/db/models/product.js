const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define(
  'product',
  {
    // name of the product
    // string, not nullable and not ''(empty string)
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    // price in decimal
    // max length is 10
    // decimal precision is 2
    price: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.0
    },
    size: {
      type: Sequelize.ENUM('small', 'medium', 'large'),
      defaultValue: 'small'
    },
    flavor: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      },
      defaultValue: 'none'
    },
    description: {
      type: Sequelize.TEXT,
      defaultValue: 'Jar full of goodies'
    },
    inventory: {
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      },
      defaultValue: 1
    },
    // boolean for availability set by admin
    // true when available
    // false when not available
    // use availability to acquire string representation
    available: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  {
    getterMethods: {
      availability() {
        return this.status ? 'available' : 'not available'
      }
    }
  }
)

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = {Product, Category}
