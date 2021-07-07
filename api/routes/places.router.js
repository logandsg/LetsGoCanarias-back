const placesRouter = require('express').Router()

const { getAllPlaces, getPlacesById, createBeach, getBeachesByParameters, getAllBeaches } = require('../controllers/places.controller')

placesRouter

  .get('/beaches/search', getBeachesByParameters)
  .get('/beaches', getAllBeaches)
  .get('/:idPlace', getPlacesById)
  .get('/', getAllPlaces)
  .post('/beaches', createBeach)

exports.placesRouter = placesRouter
