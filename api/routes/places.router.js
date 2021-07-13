const placesRouter = require('express').Router()

const { getAllPlaces, getPlaceById, postPlace, getPlacesByParameters, updatePlace, deletePlace } = require('../controllers/places.controller')

placesRouter

  .get('/search', getPlacesByParameters)
  .get('/:idPlace', getPlaceById)
  .put('/:idPlace', updatePlace)
  .delete('/:idPlace', deletePlace)
  .get('/', getAllPlaces)
  .post('/', postPlace)

exports.placesRouter = placesRouter
