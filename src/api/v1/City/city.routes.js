const { Router } = require('express')
const controller = require('./city.controller')

const routes = Router()

routes
  .post('', controller.addCity)
  .get('/all', controller.getCities)
  .put('/:id', controller.updateCityById)
  .get('/:name', controller.getCityByName)
  .delete('/:id', controller.updateCityById)

module.exports = routes
