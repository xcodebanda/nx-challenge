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
    required: true,
    default: 'https://cdn.pixabay.com/photo/2018/09/07/14/11/city-3660779_960_720.jpg'
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

module.exports = model('City', schema)
