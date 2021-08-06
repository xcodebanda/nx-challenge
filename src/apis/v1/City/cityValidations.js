const { check } = require('express-validator')
const City = require('./cityModel')

const postCheck = [

  check('name', 'Name is required').not().isEmpty(),
  check('name').custom(async value => {
    const result = await City.find({ name: value })
    if (result.length > 0) {
      throw new Error(
        `${value} already exists`
      )
    }
  }),
  check('country', 'Country is required').not().isEmpty(),
  check('img', 'Image is required').not().isEmpty()
]

module.exports = {
  postCheck
}
