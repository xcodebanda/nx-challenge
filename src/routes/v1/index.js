const { Router } = require('express')

const v1 = Router()

v1
  .use('/user', require('./user.routes'))
  .use('/cities', require('./city.routes'))
  .use('/itineraries', require('./itinerary.routes'))

module.exports = v1
