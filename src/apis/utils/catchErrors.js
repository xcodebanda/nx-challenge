const { validationResult } = require('express-validator')

module.exports = fn => (req, res, next) => {
  const errors = validationResult(req)

  errors.isEmpty()
    ? fn(req, res).catch(next)
    : res.status(400).json({
      errors: errors.array()
    })
}
