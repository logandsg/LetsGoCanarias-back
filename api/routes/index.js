const router = require('express').Router()

const { placesRouter } = require('./places.router')

router
  .use('/places', placesRouter)
exports.router = router
