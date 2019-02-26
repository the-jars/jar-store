const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 1,
      max: 5
    }
  },
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
})

// Review.belongsTo(User);
// User.hasMany(Review);
// Review.belongsTo(Product);
// Product.hasMany(Reivew);

module.exports = Review
