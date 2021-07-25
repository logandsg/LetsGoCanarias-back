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
  rate: {
    type: Number
  },
  imageUrl: {
    type: String
  },
  placeType: {
    type: String,
    enum: ['beaches', 'restaurants', 'museums', 'viewpoints']
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'placeType'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments'
  }]
})

exports.PlaceModel = mongoose.model('places', placeSchema)
