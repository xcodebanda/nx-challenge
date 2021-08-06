const { Router } = require('express')
const cities = require('./City')

const v1 = Router()

v1.use('/cities', cities)

module.exports = v1
