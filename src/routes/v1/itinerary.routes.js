const { Router } = require('express')

const { validateAuth } = require('../../auth')
const { Itinerary: controller } = require('../../controllers')
const { Itinerary: validations } = require('../../validations')

const routes = Router()

routes
  .get('/:cityId', controller.getItinerariesByCity)
  .get('/like/:itineraryId', validateAuth, controller.likes)
  .get('/checkuser/:itineraryId', validateAuth, controller.checkUser)
  .post('/', validations.addItinerariesChecks, controller.addItinerary)
  .delete('/comments/:commentId', validateAuth, controller.deleteComment)
  .post('/comments/:itineraryId', validateAuth, validations.addComentCheck, controller.addComment)
  .put('/comments/:commentId', validateAuth, validations.addComentCheck, controller.updateComment)

module.exports = routes
