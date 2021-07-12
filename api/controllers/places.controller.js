const { PlaceModel } = require("../models/places.model")
const { BeachModel } = require("../models/beaches.model")
const { RestaurantModel } = require("../models/restaurants.model")

function getSizeString (length) {
  const number = convertLengthToNumber(length)
  if (number > 200) {
    return 'Grande'
  } else if (number > 60) {
    return 'Mediana'
  } else {
    return 'Pequeña'
  }
}

function convertLengthToNumber (length) {
  const arrStr = length.split(' ')
  return parseInt(arrStr[0].replace('.', ''))
}

function getOnlyPlaceData() {

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

exports.getPlaceById = (req, res) => {
  PlaceModel
    .findById(req.params.idPlace)
    .populate("placeId")
    .then((places) => res.json(places))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

exports.getPlacesByParameters = (req, res) => {
  PlaceModel
    .find({ placeType: req.body.placeType })
    .populate('placeId')
    .then((places) => {
      let result = places.filter(function (place) {
        const beachSize = getSizeString(place.placeId.length)
        const name = req.query.name ?? place.name
        const province = req.query.province ?? place.province
        const island = req.query.island ?? place.island
        const municipality = req.query.municipality ?? place.municipality
        const size = req.query.size ?? beachSize
        const sandType = req.query.sandType ?? place.placeId.sandType
        const surge = req.query.surge ?? place.placeId.surge
        const composition = req.query.composition ?? place.placeId.composition

        if (name === place.name && province === place.province && island === place.island && municipality === place.municipality && size === beachSize && sandType === place.placeId.sandType && surge === place.placeId.surge && composition === place.placeId.composition) {
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
          placeType: place.placeType,
          imageUrl: place.imageUrl
        }
        return result
      })
      console.log(result)
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

/* ********** Post Place ************ */

function createBeach (req) {
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
  return beach.id
}

exports.postPlace = (req, res) => {
  let newPlaceId
  switch (req.body.placeType) {
    case 'beaches':
      newPlaceId = createBeach(req, res)
      break
  }
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
      imageUrl: req.body.imageUrl,
      placeType: req.body.placeType,
      placeId: newPlaceId
    })
    .then((place) => res.json(place))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

/* ********** update Place ************ */

function updateBeach (beachId, req) {
  BeachModel
    .findById(beachId)
    .then((beach) => {
      beach.municipalWeb = req.body.municipalWeb ?? beach.municipalWeb
      beach.length = req.body.length ?? beach.length
      beach.width = req.body.width ?? beach.width
      beach.occupation = req.body.occupation ?? beach.occupation
      beach.urbanization = req.body.urbanization ?? beach.urbanization
      beach.seaFront = req.body.seaFront ?? beach.seaFront
      beach.sandType = req.body.sandType ?? beach.sandType
      beach.surge = req.body.surge ?? beach.surge
      beach.zoneMarkedOut = req.body.zoneMarkedOut ?? beach.zoneMarkedOut
      beach.nudism = req.body.nudism ?? beach.nudism
      beach.vegetation = req.body.vegetation ?? beach.vegetation
      beach.blueFlag = req.body.blueFlag ?? beach.blueFlag
      beach.lifeguard = req.body.lifeguard ?? beach.lifeguard
      beach.wayToAccess = req.body.wayToAccess ?? beach.wayToAccess
      beach.disabledAccess = req.body.disabledAccess ?? beach.disabledAccess
      beach.parking = req.body.parking ?? beach.parking
      beach.parkingSlot = req.body.parkingSlot ?? beach.parkingSlot
      beach.toilets = req.body.toilets ?? beach.toilets
      beach.footWasher = req.body.footWasher ?? beach.footWasher
      beach.showers = req.body.showers ?? beach.showers
      beach.paperBind = req.body.paperBind ?? beach.paperBind
      beach.cleaningService = req.body.cleaningService ?? beach.cleaningService
      beach.rentalSunUmbrella = req.body.rentalSunUmbrella ?? beach.rentalSunUmbrella
      beach.rentalHamocks = req.body.rentalHamocks ?? beach.rentalHamocks
      beach.rentalBoats = req.body.rentalBoats ?? beach.rentalBoats
      beach.touristOffice = req.body.touristOffice ?? beach.touristOffice
      beach.food = req.body.food ?? beach.food
      beach.drinks = req.body.drinks ?? beach.drinks
      beach.childZone = req.body.childZone ?? beach.childZone
      beach.sportZone = req.body.sportZone ?? beach.sportZone
      beach.scubaDiving = req.body.scubaDiving ?? beach.scubaDiving
      beach.surfZone = req.body.surfZone ?? beach.surfZone
      beach.composition = req.body.composition ?? beach.composition
      beach.facadeLitoral = req.body.facadeLitoral ?? beach.facadeLitoral
      beach.protectedSpace = req.body.protectedSpace ?? beach.protectedSpace
      beach.save()
    })
}

exports.updatePlace = (req, res) => {
  PlaceModel
    .findById(req.params.idPlace)
    .then((place) => {
      switch (place.placeType) {
        case 'beaches':
          updateBeach(place.placeId, req)
          break
      }
      place.name = req.body.name ?? place.name
      place.municipality = req.body.municipality ?? place.municipality
      place.island = req.body.island ?? place.island
      place.province = req.body.province ?? place.province
      place.description = req.body.description ?? place.description
      place.coordX = req.body.coordX ?? place.coordX
      place.coordY = req.body.coordY ?? place.coordY
      place.coordLatitude = req.body.coordLatitude ?? place.coordLatitude
      place.coordLength = req.body.coordLength ?? place.coordLength
      place.spindle = req.body.spindle ?? place.spindle
      place.imageUrl = req.body.imageUrl ?? place.imageUrl
      place.save()

      res.json(place)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}