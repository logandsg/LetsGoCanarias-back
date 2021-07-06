const router = require('express').Router()

const { getPlaces, 
        getPlacesByType, 
        createBeach } = require('../controllers/places.controller')

router
  .get('/:placeType', getPlacesByType)
  .get('/', getPlaces)
  .post('/', createBeach)

exports.router = router
