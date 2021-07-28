const commentsRouter = require('express').Router()
const { checkAuth } = require('../../utils')

const {
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/comments.controller')

commentsRouter.post('/', checkAuth, addComment)
commentsRouter.put('/:idComment', updateComment)
commentsRouter.delete('/:idComment', deleteComment)

exports.commentsRouter = commentsRouter
