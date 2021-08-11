const compression = require('compression')
const passport = require('passport')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv/config')

const { JWTStrategy } = require('./JWT')
const { v1 } = require('./routes')
require('./config').connectDB()

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(compression())
server.use(helmet())
server.use(cors())

server.use(passport.initialize())
passport.use(JWTStrategy)

if (process.env.NODE_ENV !== 'production') {
  server.use(logger('dev'))
}

server.use('/api/v1/cities', v1.cityRoutes)
server.use('/api/v1/users', v1.userRoutes)

module.exports = server
