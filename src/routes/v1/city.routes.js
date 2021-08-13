const { Router } = require('express')

const { City: controller } = require('../../controllers')
const { City: validations } = require('../../validations')

const routes = Router()

routes
  .route('/')
  .get(controller.getCities)
  .post(validations.addCityChecks, controller.addCity)

module.exports = routes
