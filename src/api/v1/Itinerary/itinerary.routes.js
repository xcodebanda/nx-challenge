const { Router } = require('express')
const checks = require('./itinerary.checks')
const controller = require('./itinerary.controller')

const routes = Router()

routes
  .get('', controller.getItineraries)
  .post('', checks.postItinerary, controller)

module.exports = routes
