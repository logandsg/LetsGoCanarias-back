const commentsRouter = require('express').Router()

const {
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/comments.controller')

commentsRouter.post('/', addComment)
commentsRouter.put('/:idComment', updateComment)
commentsRouter.delete('/:idComment', deleteComment)

exports.commentsRouter = commentsRouter
