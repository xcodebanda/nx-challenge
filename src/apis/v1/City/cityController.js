const { catchErrors: Catch } = require('../../utils')
const City = require('./cityModel')

exports.getCities = Catch(async (_, res) => {
  const cities = await City.find({})
  res.status(200).json({
    data: cities
  })
})

exports.addCity = Catch(async (req, res) => {
  const city = await City.create(req.body)
  res.status(201).json({
    data: city
  })
})
