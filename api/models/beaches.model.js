const mongoose = require('mongoose')

const beachSchema = new mongoose.Schema({
  imageUsersUrl: {
    type: Array,
  },
  municipalWeb: {
    type: String,
  },
  length: {
    type: String,
  },
  width: {
    type: String,
  },
  occupation: {
    type: String,
  },
  urbanization: {
    type: String,
  },
  seaFront: {
    type: String,
  },
  sandType: {
    type: String,
  },
  surge: {
    type: String,
  },
  zoneMarkedOut: {
    type: String,
  },
  nudism: {
    type: String,
  },
  vegetation: {
    type: String,
  },
  blueFlag: {
    type: String,
  },
  lifeguard: {
    type: String,
  },
  wayToAccess: {
    type: String,
  },
  disabledAccess: {
    type: String,
  },
  parking: {
    type: String,
  },
  parkingSlot: {
    type: String,
  },
  toilet: {
    type: String,
  },
  footWasher: {
    type: String,
  },
  showers: {
    type: String,
  },
  trashCan: {
    type: String,
  },
  cleaningService: {
    type: String,
  },
  rentalSunUmbrella: {
    type: String,
  },
  rentalHamocks: {
    type: String,
  },
  rentalBoats: {
    type: String,
  },
  touristOffice: {
    type: String,
  },
  food: {
    type: String,
  },
  drinks: {
    type: String,
  },
  childZone: {
    type: String,
  },
  sportZone: {
    type: String,
  },
  scubaDiving: {
    type: String,
  },
  surfZone: {
    type: String,
  },
  composition: {
    type: String,
  },
  coastLine: {
    type: String,
  },
  protectedSpace: {
    type: String,
  },
})

exports.BeachModel = mongoose.model('beaches', beachSchema)
