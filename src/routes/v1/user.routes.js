const { Router } = require('express')

const { validateAuth } = require('../../auth')
const { User: controller } = require('../../controllers')
const { User: validations } = require('../../validations')

const routes = Router()

routes
  .post('/signin', validations.signInChecks, controller.signIn)
  .post('/signup', validations.signUpChecks, controller.signUp)
  .get('/signinls', validateAuth, controller.signInLS)

module.exports = routes
