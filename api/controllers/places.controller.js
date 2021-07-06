const { PlaceModel } = require("../models/places.model")
const { BeachModel } = require("../models/beaches.model")
const { RestaurantModel } = require("../models/restaurants.model")

exports.getPlaces = (req, res) => {
  PlaceModel
    .find()
    .populate("placeId")
    .then((places) => res.json(places))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

exports.getPlacesByType = (req, res) => {
  PlaceModel
    .find({ placeType: req.params.placeType })
    .populate("placeId")
    .then((places) => res.json(places))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

exports.createBeach = (req, res) => {
  const beach = new BeachModel({
    municipality: req.body.municipality,
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
