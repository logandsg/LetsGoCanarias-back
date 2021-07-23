const mongoose = require('mongoose')

const museumSchema = new mongoose.Schema({
  imageUsersUrl: {
    type: Array,
    default: []
  },
  web: {
    type: String
  },
  address: {
    type: String
  },
  telephone: {
    type: String
  }
})

exports.MuseumModel = mongoose.model('museums', museumSchema)
