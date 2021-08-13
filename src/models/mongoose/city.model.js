const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  img: {
    type: String,
    required: [true, 'Image is required'],
    default: 'https://lorempixel.com/1200/800/city/'
  }
})

module.exports = model('city', schema)
