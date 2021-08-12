const passport = require('passport')
const { Router } = require('express')
const { itineraryController } = require('../../controllers')

const {
  likes,
  checkUser,
  addComment,
  addItinerary,
  getCityItineraries
} = itineraryController

const routes = Router()

routes
  .post('/', addItinerary)
  .get('/:cityid', getCityItineraries)
  .use('/like/:itineraryId', passport.authenticate('jwt', { session: false }), likes)
  .use('/checkuser/:itineraryId', passport.authenticate('jwt', { session: false }), checkUser)

routes
  .use(passport.authenticate('jwt', { session: false }))
  .route('/comments/:itineraryId')
  .post(addComment)

module.exports = routes
