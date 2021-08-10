const compression = require('compression')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const { v1 } = require('./routes')
require('./config').connectDB()

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(compression())
server.use(helmet())
server.use(cors())

if (process.env.NODE_ENV !== 'production') {
  server.use(logger('dev'))
}

server.use('/api/v1/cities', v1.cityRoutes)

module.exports = server
