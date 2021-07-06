const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
  tipo: {
    type: String
  }
})

exports.RestaurantSchema = mongoose.model('restaurants', restaurantSchema)
