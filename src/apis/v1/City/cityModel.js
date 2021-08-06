const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    unique: true,
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
})

module.exports = model('City', schema)
