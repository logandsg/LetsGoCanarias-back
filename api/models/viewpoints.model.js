const mongoose = require('mongoose')

const viewpointSchema = new mongoose.Schema({
  imageUsersUrl: {
    type: Array,
    default: []
  }
})

exports.ViewpointModel = mongoose.model('viewpoints', viewpointSchema)