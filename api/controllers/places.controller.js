const { PlaceModel } = require("../models/places.model")
const { BeachModel } = require("../models/beaches.model")
const { RestaurantModel } = require("../models/restaurants.model")

function getSizeString (length) {
  const number = convertLengthToNumber(length)
  if (number > 200) {
    return 'grande'
  } else if (number > 60) {
    return 'mediana'
  } else {
    return 'pequeña'
  }
}

function convertLengthToNumber (length) {
  const arrStr = length.split(' ')
  return parseInt(arrStr[0].replace('.', ''))
}

exports.getAllPlaces = (req, res) => {
  PlaceModel
    .find()
    .populate("placeId")
    .then((places) => res.json(places))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

exports.getPlacesById = (req, res) => {
  PlaceModel
    .findById(req.params.idPlace)
    .populate("placeId")
    .then((places) => res.json(places))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

exports.getAllBeaches = (req, res) => {
  PlaceModel
    .find({ placeType: 'beaches' })
    .populate("placeId")
    .then((places) => res.json(places))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

exports.getBeachesByParameters = (req, res) => {
  PlaceModel
    .find({ placeType: 'beaches' })
    .populate('placeId')
    .then((places) => {
      let result = places.filter(function (place) {
        const beachSize = getSizeString(place.placeId.length)

        const province = req.body.province ?? place.province
        const island = req.body.island ?? place.island
        const municipality = req.body.municipality ?? place.municipality
        const size = req.body.size ?? beachSize
        const sandType = req.body.sandType ?? place.placeId.sandType
        const surge = req.body.surge ?? place.placeId.surge

        if (province === place.province && island === place.island && municipality === place.municipality && size === beachSize && sandType === place.placeId.sandType && surge === place.placeId.surge) {
          return true
        }
        return false
      })
      result = result.map(function (place) {
        const result = {
          _id: place._id,
          name: place.name,
          municipality: place.municipality,
          island: place.island,
          province: place.province,
          description: place.description,
          coordLatitude: place.coordLatitude,
          coordLength: place.coordLength,
          spindle: place.spindle,
          coordX: place.coordX,
          coordY: place.coordY,
          placeType: place.placeType
        }
        return result
      })


      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

exports.createBeach = (req, res) => {
  const beach = new BeachModel({
    municipalWeb: req.body.municipalWeb,
    length: req.body.length,
    width: req.body.width,
    occupation: req.body.occupation,
    urbanization: req.body.urbanization,
    seaFront: req.body.seaFront,
    sandType: req.body.sandType,
    surge: req.body.surge,
    zoneMarkedOut: req.body.zoneMarkedOut,
    nudism: req.body.nudism,
    vegetation: req.body.vegetation,
    blueFlag: req.body.blueFlag,
    lifeguard: req.body.lifeguard,
    wayToAccess: req.body.wayToAccess,
    disabledAccess: req.body.disabledAccess,
    parking: req.body.parking,
    parkingSlot: req.body.parkingSlot,
    toilets: req.body.toilets,
    footWasher: req.body.footWasher,
    showers: req.body.showers,
    paperBind: req.body.paperBind,
    cleaningService: req.body.cleaningService,
    rentalSunUmbrella: req.body.rentalSunUmbrella,
    rentalHamocks: req.body.rentalHamocks,
    rentalBoats: req.body.rentalBoats,
    touristOffice: req.body.touristOffice,
    food: req.body.food,
    drinks: req.body.drinks,
    childZone: req.body.childZone,
    sportZone: req.body.sportZone,
    scubaDiving: req.body.scubaDiving,
    surfZone: req.body.surfZone,
    composition: req.body.composition,
    facadeLitoral: req.body.facadeLitoral,
    protectedSpace: req.body.protectedSpace
  })
  beach.save()
  PlaceModel
    .create({
      name: req.body.name,
      municipality: req.body.municipality,
      island: req.body.island,
      province: req.body.province,
      description: req.body.description,
      coordX: req.body.coordX,
      coordY: req.body.coordY,
      coordLatitude: req.body.coordLatitude,
      coordLength: req.body.coordLength,
      spindle: req.body.spindle,
      placeType: req.body.placeType,
      placeId: beach._id
    })
    .then((place) => res.json(place))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}
