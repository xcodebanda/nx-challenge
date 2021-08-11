const { Router } = require('express')
const { cityController } = require('../../controllers')
const { cityValidations } = require('../../validations')

const {
  addCity,
  getCities,
  getCityByName,
  updateCityByName
} = cityController

const {
  addCityChecks
} = cityValidations

const routes = Router()

routes
  .route('/')
  .get(getCities)
  .post(addCityChecks, addCity)

routes
  .route('/:name')
  .get(getCityByName)
  .put(updateCityByName)
  .delete(updateCityByName)

module.exports = routes
