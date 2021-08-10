const { body } = require('express-validator')
const { cityRepository: repository } = require('../repositories/mongodb')

exports.addCityChecks = [
  body('name', 'Name is required')
    .not()
    .isEmpty(),
  body('name')
    .custom(async name => {
      const result = await repository.getCities({ name })
      console.log('VALOR:', name, 'FIN', name.length, result)
      if (result.length > 0) throw new Error(`${name} already exists`)
    }),
  body('country', 'Country is required')
    .not()
    .isEmpty(),
  body('img', 'Image is required')
    .not()
    .isEmpty()
]
