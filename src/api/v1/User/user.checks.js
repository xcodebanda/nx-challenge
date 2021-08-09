const { check } = require('express-validator')

const {
  mongoRepositories: {
    userRepository: repository
  }
} = require('../../../database')

exports.postUser = [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Valid email is required').not().isEmpty().isEmail(),
  check('email').custom(async value => {
    const city = await repository.getItineraries({ email: value })
    if (city.length > 0) throw new Error(`${value} already exists`)
  }),
  check('password', 'Password is required').not().isEmpty(),
  check('userPic', 'User pic is required').not().isEmpty(),
  check('country', 'country is required').not().isEmpty()
]
