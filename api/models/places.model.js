const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  municipality: {
    type: String
  },
  island: {
    type: String
  },
  province: {
    type: String
  },
  description: {
    type: String
  },
  coordX: {
    type: String
  },
  coordY: {
    type: String
  },
  coordLatitude: {
    type: String
  },
  coordLength: {
    type: String
  },
  spindle: {
    type: String
  },
  placeType: {
    type: String,
    enum: ['beaches', 'restaurants']
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'placeType'
  }
})

exports.PlaceModel = mongoose.model('places', placeSchema)
