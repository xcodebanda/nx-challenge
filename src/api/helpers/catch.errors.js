const { request, response } = require('express')
const { validationResult } = require('express-validator')

module.exports = fn => (req = request, res = response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      status: 400
    })
  }

  fn(req, res).catch((error) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(error.message)
    }

    res.status(500).json({
      message: 'Internal server error',
      status: 500
    })
  })
}
