const { Router } = require('express')

const {
  addCity,
  getCities
} = require('./cityController')

const { postCheck } = require('./cityValidations')

const routes = Router()

routes
  .get('/all', getCities)
  .post('', postCheck, addCity)

module.exports = routes
