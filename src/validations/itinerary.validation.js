const { body } = require('express-validator')

exports.addItinerariesChecks = [/* TODO: add validations xd */]

exports.addComentCheck = [
  body('text', 'text is required').not().isEmpty()
]
