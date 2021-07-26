const authRouter = require('express').Router()
const { checkAuth } = require('../../utils')

const {
  login,
  profile,
  signup
} = require('../controllers/auth.controller')

authRouter.get('/profile', checkAuth, profile)
authRouter.post('/login', login)
authRouter.post('/signup', signup)

exports.authRouter = authRouter
