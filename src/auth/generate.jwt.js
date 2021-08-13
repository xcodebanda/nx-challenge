const jwt = require('jsonwebtoken')
require('dotenv/config')

module.exports = async (user) => new Promise((resolve, reject) => {
  const payload = {
    id: user.id,
    username: user.firstName,
    avatarPicture: user.userPic
  }
  jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 2592000 }, (error, token) => {
    !error ? resolve(token) : reject(new Error('There was an error with jwt'))
  })
})
