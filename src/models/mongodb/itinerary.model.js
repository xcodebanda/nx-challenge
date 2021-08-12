const { Schema, model } = require('mongoose')

const schema = new Schema({

  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true,
    default: 'https://cdn.pixabay.com/photo/2018/09/07/14/11/city-3660779_960_720.jpg'
  },
  activities: {
    type: [
      {
        name: String,
        img: {
          type: String,
          default: 'https://cdn.pixabay.com/photo/2018/09/07/14/11/city-3660779_960_720.jpg'
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
        ref: 'user',
        type: Schema.Types.ObjectId
      },
      text: String,
      userPic: String,
      userName: String
    }
  ],
  usersLike: [
    {
      ref: 'user',
      type: Schema.Types.ObjectId
    }
  ],
  cityId: {
    ref: 'city',
    required: true,
    type: Schema.Types.ObjectId
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

module.exports = model('Itinerary', schema)
