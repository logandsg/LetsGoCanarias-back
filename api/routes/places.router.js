const placesRouter = require('express').Router()

const { getAllPlaces, getPlacesById, createBeach, getPlacesByParameters } = require('../controllers/places.controller')

placesRouter
  .get('/search', getPlacesByParameters)
  .get('/:idPlace', getPlacesById)
  .get('/', getAllPlaces)
  .post('/', createBeach)

exports.placesRouter = placesRouter
