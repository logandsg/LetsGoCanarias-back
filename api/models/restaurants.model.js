const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
  imageUsersUrl: {
    type: Array
  },
  price: {
    type: String
  },
  establishmentType: {
    type: String
  },
  cuisine: {
    type: String
  },
  specialty: {
    type: String
  },
  schedule: {
    type: String
  },
  disabledAccess: {
    type: String
  },
  disabledBath: {
    type: String
  },
  petFriendly: {
    type: String
  },
  installationFeatures: {
    type: String
  },
  web: {
    type: String
  },
  telephone: {
    type: String
  },
  address: {
    type: String
  },
  dayMenu: {
    type: String
  },
  vegetarianOption: {
    type: String
  },
  veganOption: {
    type: String
  },
  parking: {
    type: String
  },
  glutenFree: {
    type: String
  },
  meals: {
    type: Array,
    default: [],
    enum: ['Desayuno', 'Cena', 'Almuerzo', 'Branch']
  },
  menu: {
    type: Array,
    default: []
  }
})

exports.RestaurantModel = mongoose.model('restaurants', restaurantSchema)
