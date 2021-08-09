const { check } = require('express-validator')

const {
  mongoRepositories: {
    itineraryRepository,
    cityRepository
  }
} = require('../../../database')

exports.postItinerary = [
  check('title', 'Title is required').not().isEmpty(),
  check('title').custom(async value => {
    const city = await itineraryRepository.getItineraries({ title: value })
    if (city.length > 0) throw new Error(`${value} already exists`)
  }),
  check('cityId', 'City ID is required').not().isEmpty(),
  check('cityId').custom(async value => {
    const city = await cityRepository.getCities({ _id: value })
    if (city.length === 0) throw new Error(`City Id ${value} was not found`)
  })
]
