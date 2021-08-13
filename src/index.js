const compression = require('compression')
const passport = require('passport')
const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv/config')

const { strategyJWT } = require('./auth')
const { v1 } = require('./routes')

require('./database/mongodb').connect()
const app = express()

app.use(express.urlencoded({ extended: true }))
  .use(passport.initialize())
  .use(express.json())
  .use(compression())
  .use(helmet())
  .use(cors())

passport.use(strategyJWT)

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'))
}

app.use('/api/v1', v1)

module.exports = app
