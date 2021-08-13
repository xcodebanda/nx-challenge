const { ExtractJwt, Strategy } = require('passport-jwt')
require('dotenv/config')

const { User } = require('../repositories/mongoose')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || ''
}

module.exports = new Strategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.getUserById(jwtPayload.id)
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  } catch (err) {
    console.log(err)
    return done(err)
  }
})
