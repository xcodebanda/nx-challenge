const { Schema, model } = require('mongoose')

const schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userPic: {
    type: String,
    required: true,
    default: 'https://image.flaticon.com/icons/png/512/633/633779.png'
  },
  country: {
    type: String,
    required: true
  }
})

module.exports = model('user', schema)
