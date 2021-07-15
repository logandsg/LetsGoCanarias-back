const router = require('express').Router()

const { placesRouter } = require('./places.router')
const { authRouter } = require('./auth.router')
const { usersRouter } = require('./users.router')

router
  .use('/places', placesRouter)
  .use('/auth', authRouter)
  .use('/users', usersRouter)
exports.router = router
