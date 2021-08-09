const { Router } = require('express')
const checks = require('./user.checks')
const controller = require('./user.controller')

const routes = Router()

routes
  .get('', controller.getUsers)
  .post('', checks.postUser, controller.addUser)

module.exports = routes
