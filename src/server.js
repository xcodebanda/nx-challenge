const compression = require('compression')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const { v1 } = require('./api')
require('./database').mongodb()

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(compression())
server.use(helmet())
server.use(cors())

if (process.env.NODE_ENV !== 'production') {
  server.use(logger('combined'))
}

server.use('/api/v1', v1)

module.exports = server
