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
    type: Number
  },
  coordY: {
    type: Number
  },
  coordLatitude: {
    type: String
  },
  coordLongitude: {
    type: String
  },
  spindle: {
    type: String
  },
  rate: {
    type: Number,
    default: 0
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
    ref: 'comments',
    default: []
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  createdAt: {
    type: Date
  }
})

exports.PlaceModel = mongoose.model('places', placeSchema)
