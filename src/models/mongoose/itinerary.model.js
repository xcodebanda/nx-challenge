const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  activities: {
    type: [
      {
        name: String,
        img: {
          type: String,
          default: 'https://lorempixel.com/1200/800/people/'
        }
      }
    ],
    required: false
  },
  authorName: {
    type: String,
    required: true
  },
  authorPic: {
    type: String,
    required: true,
    default: 'https://image.flaticon.com/icons/png/512/633/633779.png'
  },
  price: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  duration: {
    type: Number,
    min: 1,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  hashtags: [String],
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      text: String,
      userName: String,
      userPic: String
    }
  ],
  usersLike: [String],
  cityId: {
    type: Schema.Types.ObjectId,
    ref: 'city',
    required: true
  }
})

module.exports = model('itinerary', schema)
