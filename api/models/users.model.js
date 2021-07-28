const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true,
    enum: ['user', 'administrator']
  },
  favs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'places'
  }]
})

exports.UserModel = mongoose.model('users', userSchema)
