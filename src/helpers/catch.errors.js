const { validationResult } = require('express-validator')
const { request, response } = require('express')
require('dotenv/config')

const RequestReponse = require('./req.response')

module.exports = fn => (req = request, res = response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(RequestReponse.validations(
      'Some data are wrong', errors.array(), 400
    ))
  }

  fn(req, res).catch((error) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error.message)
    }

    res.status(500).json(RequestReponse.fail(
      'Internal Server Error', 500
    ))
  })
}
