const { PlaceModel } = require("../models/places.model")
const { BeachModel } = require("../models/beaches.model")
const { RestaurantModel } = require("../models/restaurants.model")
const { MuseumModel } = require("../models/museums.model")
const { ViewpointModel } = require("../models/viewpoints.model")

function getBeachSize (length) {
  const number = convertLengthToNumber(length)
  if (number > 200) {
    return "Grande"
  } else if (number > 60) {
    return "Mediana"
  } else {
    return "Pequeña"
  }
}

function convertLengthToNumber (length) {
  const arrStr = length.split(" ")
  return parseInt(arrStr[0].replace(".", ""))
}

function isInArrayOrIsNull (elem, arr) {
  if (elem === undefined) {
    return true
  }
  const elemLowerCase = elem.toLowerCase()
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].toLowerCase().includes(elemLowerCase)) {
      return true
    }
  }
  return false
}

exports.getAllPlaces = (req, res) => {
  PlaceModel.find()
    .populate("placeId")
    .populate("comments")
    .then((places) => res.status(200).json(places))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

exports.getPlaceById = (req, res) => {
  PlaceModel.findById(req.params.idPlace)
    .populate("placeId")
    .populate('comments')
    .then((places) => res.status(200).json(places))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

/* ********** Find Place By Filters ************ */

function filterByPlaceParameters (places, req) {
  return places.filter(function (place) {
    const name = req.query.name ?? place.name
    const province = req.query.province ?? place.province
    const island = req.query.island ?? place.island
    const municipality = req.query.municipality ?? place.municipality

    if (
      place.name.toLowerCase().includes(name.toLowerCase()) &&
      province === place.province &&
      island === place.island &&
      municipality === place.municipality
    ) {
      return true
    }
    return false
  })
}

function filterByBeachParameters (places, req) {
  return places.filter(function (place) {
    const beachSize = getBeachSize(place.placeId.length)
    const size = req.query.size ?? beachSize
    const occupation = req.query.occupation ?? place.placeId.occupation
    const urbanization = req.query.urbanization ?? place.placeId.urbanization
    const seaFront = req.query.seaFront ?? place.placeId.seaFront
    const sandType = req.query.sandType ?? place.placeId.sandType
    const surge = req.query.surge ?? place.placeId.surge
    const nudism = req.query.nudism ?? place.placeId.nudism
    const blueFlag = req.query.blueFlag ?? place.placeId.blueFlag
    const lifeguard = req.query.lifeguard ?? place.placeId.lifeguard
    const wayToAccess = req.query.wayToAccess ?? place.placeId.wayToAccess
    const disabledAccess =
      req.query.disabledAccess ?? place.placeId.disabledAccess
    const parking = req.query.parking ?? place.placeId.parking
    const showers = req.query.showers ?? place.placeId.showers
    const rentalSunUmbrella =
      req.query.rentalSunUmbrella ?? place.placeId.rentalSunUmbrella
    const rentalHamocks = req.query.rentalHamocks ?? place.placeId.rentalHamocks
    const rentalBoats = req.query.rentalBoats ?? place.placeId.rentalBoats
    const food = req.query.food ?? place.placeId.food
    const drinks = req.query.drinks ?? place.placeId.drinks
    const childZone = req.query.childZone ?? place.placeId.childZone
    const sportZone = req.query.sportZone ?? place.placeId.sportZone
    const scubaDiving = req.query.scubaDiving ?? place.placeId.scubaDiving
    const surfZone = req.query.surfZone ?? place.placeId.surfZone

    if (
      size === beachSize &&
      occupation === place.placeId.occupation &&
      urbanization === place.placeId.urbanization &&
      seaFront === place.placeId.seaFront &&
      sandType === place.placeId.sandType &&
      surge === place.placeId.surge &&
      nudism === place.placeId.nudism &&
      blueFlag === place.placeId.blueFlag &&
      lifeguard === place.placeId.lifeguard &&
      wayToAccess === place.placeId.wayToAccess &&
      disabledAccess === place.placeId.disabledAccess &&
      parking === place.placeId.parking &&
      showers === place.placeId.showers &&
      rentalSunUmbrella === place.placeId.rentalSunUmbrella &&
      rentalHamocks === place.placeId.rentalHamocks &&
      rentalBoats === place.placeId.rentalBoats &&
      food === place.placeId.food &&
      drinks === place.placeId.drinks &&
      childZone === place.placeId.childZone &&
      sportZone === place.placeId.sportZone &&
      scubaDiving === place.placeId.scubaDiving &&
      surfZone === place.placeId.surfZone
    ) {
      return true
    }
    return false
  })
}

function filterByRestaurantParameters (places, req) {
  return places.filter(function (place) {
    const price = req.query.price ?? place.placeId.price
    const establishmentType = req.query.establishmentType ?? place.placeId.establishmentType
    const cuisine = req.query.cuisine ?? place.placeId.cuisine
    const parking = req.query.parking ?? place.placeId.parking
    const specialty = req.query.specialty ?? place.placeId.specialty
    const schedule = req.query.schedule ?? place.placeId.schedule
    const disabledAccess = req.query.disabledAccess ?? place.placeId.disabledAccess
    const disabledBath = req.query.disabledBath ?? place.placeId.disabledBath
    const petFriendly = req.query.petFriendly ?? place.placeId.petFriendly
    const installationFeatures = req.query.installationFeatures ?? place.placeId.installationFeatures
    const web = req.query.web ?? place.placeId.web
    const telephone = req.query.telephone ?? place.placeId.telephone
    const address = req.query.address ?? place.placeId.address
    const dayMenu = req.query.dayMenu ?? place.placeId.dayMenu
    const vegetarianOption = req.query.vegetarianOption ?? place.placeId.vegetarianOption
    const veganOption = req.query.veganOption ?? place.placeId.veganOption
    const halalOption = req.query.halalOption ?? place.placeId.halalOption
    const glutenFree = req.query.glutenFree ?? place.placeId.glutenFree
    const meals = req.query.meals ?? place.placeId.meals[0]
    const menu = req.query.menu ?? place.placeId.menu[0]

    if (
      price === place.placeId.price &&
      establishmentType === place.placeId.establishmentType &&
      cuisine === place.placeId.cuisine &&
      parking === place.placeId.parking &&
      specialty === place.placeId.specialty &&
      schedule === place.placeId.schedule &&
      disabledAccess === place.placeId.disabledAccess &&
      disabledBath === place.placeId.disabledBath &&
      petFriendly === place.placeId.petFriendly &&
      installationFeatures === place.placeId.installationFeatures &&
      web === place.placeId.web &&
      telephone ===  place.placeId.telephone &&
      address === place.placeId.address &&
      dayMenu === place.placeId.dayMenu &&
      vegetarianOption ===  place.placeId.vegetarianOption &&
      veganOption === place.placeId.veganOption &&
      halalOption === place.placeId.halalOption &&
      glutenFree === place.placeId.glutenFree &&
      isInArrayOrIsNull(meals, place.placeId.meals) &&
      isInArrayOrIsNull(menu, place.placeId.menu)
    ) {
      return true
    }
    return false
  })
}

exports.getPlacesByParameters = (req, res) => {
  let findParameters = {}
  if (req.query.placeType) {
    findParameters = { placeType: req.query.placeType }
  }
  PlaceModel.find(findParameters)
    .populate('placeId')
    .then((places) => {
      let result = filterByPlaceParameters(places, req)
      if (req.query.placeType) {
        switch (req.query.placeType) {
          case "beaches":
            result = filterByBeachParameters(result, req)
            break
          case "restaurants":
            result = filterByRestaurantParameters(result, req)
            break
        }
      }
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
          imageUrl: place.imageUrl,
          createdAt: place.createdAt
        }
        return result
      })
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

/* ********** Post Place ************ */

function createBeach (req) {
  const beach = new BeachModel({
    imageUsersUrl: req.body.imageUsersUrl,
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

function createRestaurant (req) {
  const restaurant = new RestaurantModel({
    imageUsersUrl: req.body.imageUsersUrl,
    price: req.body.price,
    establishmentType: req.body.establishmentType,
    cuisine: req.body.cuisine,
    parking: req.body.parking,
    specialty: req.body.specialty,
    schedule: req.body.schedule,
    disabledAccess: req.body.disabledAccess,
    disabledBath: req.body.disabledBath,
    petFriendly: req.body.petFriendly,
    installationFeatures: req.body.installationFeatures,
    web: req.body.web,
    telephone: req.body.telephone,
    address: req.body.address,
    dayMenu: req.body.dayMenu,
    vegetarianOption: req.body.vegetarianOption,
    veganOption: req.body.veganOption,
    halalOption: req.body.halalOption,
    glutenFree: req.body.glutenFree,
    meals: req.body.meals,
    menu: req.body.menu
  })
  restaurant.save()
  return restaurant.id
}

function createMuseum (req) {
  const museum = new MuseumModel({
    imageUsersUrl: req.body.imageUsersUrl,
    web: req.body.web,
    address: req.body.address
  })
  museum.save()
  return museum.id
}

function createViewpoint (req) {
  const viewpoint = new ViewpointModel({
    imageUsersUrl: req.body.imageUsersUrl,
  })
  viewpoint.save()
  return viewpoint.id
}

exports.postPlace = (req, res) => {
  let newPlaceId
  switch (req.body.placeType) {
    case "beaches":
      newPlaceId = createBeach(req)
      break
    case "restaurants":
      newPlaceId = createRestaurant(req)
      break
    case "museums":
      newPlaceId = createMuseum(req)
      break
    case "viewpoints":
      newPlaceId = createViewpoint(req)
      break
  }
  PlaceModel.create({
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
    placeId: newPlaceId,
    createdAt: new Date()
  })
    .then((place) => res.status(200).json(place))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

/* ********** update Place ************ */

function updateBeach (beachId, req) {
  BeachModel.findById(beachId).then((beach) => {
    beach.imageUsersUrl = req.body.imageUsersUrl ?? beach.imageUsersUrl
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

function updateRestaurant (restaurantId, req) {
  RestaurantModel.findById(restaurantId).then((restaurant) => {
    restaurant.imageUsersUrl = req.body.imageUsers ?? restaurant.imageUsersUrl
    restaurant.price = req.body.price ?? restaurant.price
    restaurant.establishmentType = req.body.establishmentType ?? restaurant.establishmentType
    restaurant.cuisine = req.body.cuisine ?? restaurant.cuisine
    restaurant.parking = req.body.parking ?? restaurant.parking
    restaurant.specialty = req.body.specialty ?? restaurant.specialty
    restaurant.schedule = req.body.schedule ?? restaurant.schedule
    restaurant.disabledAccess = req.body.disabledAccess ?? restaurant.disabledAccess
    restaurant.disabledBath = req.body.disabledBath ?? restaurant.disabledBath
    restaurant.petFriendly = req.body.petFriendly ?? restaurant.petFriendly
    restaurant.installationFeatures = req.body.installationFeatures ?? restaurant.installationFeatures
    restaurant.web = req.body.web ?? restaurant.web
    restaurant.telephone = req.body.telephone ?? restaurant.telephone
    restaurant.address = req.body.address ?? restaurant.address
    restaurant.dayMenu = req.body.dayMenu ?? restaurant.dayMenu
    restaurant.veganOption = req.body.veganOption ?? restaurant.veganOption
    restaurant.vegetarianOption = req.body.vegetarianOption ?? restaurant.vegetarianOption
    restaurant.halalOption = req.body.halalOption ?? restaurant.halalOption
    restaurant.glutenFree = req.body.glutenFree ?? restaurant.glutenFree
    restaurant.meals = req.body.meals ?? restaurant.meals
    restaurant.menu = req.body.menu ?? restaurant.menu
    restaurant.save()
  })
}

function updateMuseum (museumId, req) {
  MuseumModel.findById(museumId).then((museum) => {
    museum.imageUsersUrl = req.body.imageUsers ?? museum.imageUsersUrl
    museum.web = req.body.web ?? museum.web
    museum.address = req.body.address ?? museum.address
    museum.save()
  })
}

function updateViewpoint (viewpointId, req) {
  ViewpointModel.findById(viewpointId).then((viewpoint) => {
    viewpoint.imageUsersUrl = req.body.imageUsers ?? viewpoint.imageUsersUrl
    viewpoint.save()
  })
}

exports.updatePlace = (req, res) => {
  PlaceModel.findById(req.params.idPlace)
    .then((place) => {
      switch (place.placeType) {
        case "beaches":
          updateBeach(place.placeId, req)
          break
        case "restaurants":
          updateRestaurant(place.placeId, req)
          break
        case "museums":
          updateMuseum(place.placeId, req)
          break
        case "viewpoints":
          updateViewpoint(place.placeId, req)
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
      place.createdAt = new Date()
      place.save()
      res.status(200).json(place)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}

/* ********** delete Place ************ */

exports.deletePlace = (req, res) => {
  PlaceModel.findByIdAndRemove(req.params.idPlace)
    .then((place) => {
      switch (place.placeType) {
        case "beaches":
          BeachModel.findByIdAndRemove(place.placeId).catch((err) => {
            console.log(err)
          })
          break
        case "restaurants":
          RestaurantModel.findByIdAndRemove(place.placeId).catch((err) => {
            console.log(err)
          })
          break
        case "museums":
          MuseumModel.findByIdAndRemove(place.placeId).catch((err) => {
            console.log(err)
          })
          break
        case "viewpoints":
          ViewpointModel.findByIdAndRemove(place.placeId).catch((err) => {
            console.log(err)
          })
          break
      }
      res.status(200).json({ msg: `${place.name} has been deleted!` })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ msg: "Error" })
    })
}
