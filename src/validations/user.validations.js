
const { compareSync } = require('bcryptjs')
const { body } = require('express-validator')
const { User: repository } = require('../repositories/mongoose')

exports.signUpChecks = [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string'),
  body('lastName')
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string'),
  body('email')
    .isEmail()
    .withMessage('Email is required'),
  body('email')
    .custom(async (email, { req }) => {
      const result = await repository.getUsers({ email })
      if (result.length > 0) throw new Error(`${email} already exists`)
    }),
  body('country')
    .not()
    .isEmpty()
    .withMessage('Country is required')
    .isString()
    .withMessage('Country must be a string'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
  body('img', 'Image must be a valid URL')
    .optional()
    .isURL()
]

exports.signInChecks = [
  body('email', 'Email is required').isEmail(),
  body('password', 'Password is required').not().isEmpty(),
  body('email').custom(async (email, { req }) => {
    if (!email) return

    const result = await repository.getUsers({ email })
    if (result.length === 0) throw new Error(`${email} was not found`)
    const isPasswordValid = compareSync(req.body.password, result[0].password)
    if (!isPasswordValid) throw new Error('Password incorrect')
  })
]
