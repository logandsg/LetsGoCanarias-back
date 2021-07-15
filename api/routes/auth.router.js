const authRouter = require('express').Router()
const { checkAuth } = require('../../utils')

const {
  login,
  profile
} = require('../controllers/auth.controller')

authRouter.get('/profile', checkAuth, profile)
authRouter.post('/login', login)

exports.authRouter = authRouter