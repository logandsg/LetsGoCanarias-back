const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    default: null
  },
  createdAt: {
    type: Date
  }
})

exports.CommentModel = mongoose.model('comments', commentSchema)