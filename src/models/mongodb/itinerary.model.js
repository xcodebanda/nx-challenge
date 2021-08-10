const { Schema, model, SchemaTypes } = require('mongoose')

const schema = new Schema({
  title: {
    unique: true,
    type: String,
    required: true
  },
  img: String,
  activities: [{
    name: {
      type: String,
      required: true
    },
    img: String
  }],
  authorName: {
    type: String,
    required: true
  },
  authorPic: String,
  price: Number,
  duration: Number,
  likes: Number,
  hashtags: [String],
  comments: [{
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User'
    },
    test: String,
    userPic: String,
    userName: String
  }],
  usersLike: [String],
  cityId: {
    type: SchemaTypes.ObjectId,
    ref: 'City'
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

module.exports = model('Itinerary', schema)
