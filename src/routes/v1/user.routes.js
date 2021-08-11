const { Router } = require('express')
const passport = require('passport')

const { userController: controller } = require('../../controllers')
const { userValidations: validations } = require('../../validations')

const routes = Router()

routes
  .post('/signin', validations.signInChecks, controller.signIn)
  .post('/signup', validations.signUpChecks, controller.signUp)

routes
  .use(passport.authenticate('jwt', { session: false }))
  .get('/', controller.getUsers)
  .get('/:id', controller.getUserByID)

module.exports = routes
