const placesRouter = require('express').Router()

const { getAllPlaces, getPlaceById, postPlace, getPlacesByParameters, updatePlace, deletePlace } = require('../controllers/places.controller')

const { checkAuth } = require('../../utils')

placesRouter

  .get('/search', checkAuth, getPlacesByParameters)
  .get('/:idPlace', getPlaceById)
  .put('/:idPlace', updatePlace)
  .delete('/:idPlace', deletePlace)
  .get('/', getAllPlaces)
  .post('/', postPlace)

exports.placesRouter = placesRouter
