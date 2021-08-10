const { Router } = require('express')
const { cityController: controller } = require('../../controllers')
const { cityValidations: validations } = require('../../validations')

const routes = Router()

routes
  .get('/', controller.getCities)
  .get('/:name', controller.getCityByName)
  .delete('/:name', controller.updateCityByName)
  .post('/', validations.addCityChecks, controller.addCity)
  .put('/:name', validations.addCityChecks, controller.updateCityByName)

module.exports = routes
