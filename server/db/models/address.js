const Sequelize = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
  type: {
    type: Sequelize.STRING
  },
  line_1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  line_2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  }
  // user: {
  //  Address.hasOne(User)
  // },
})

module.exports = Address
