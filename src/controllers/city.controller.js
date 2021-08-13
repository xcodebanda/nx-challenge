const { request, response } = require('express')

const { City: repository } = require('../repositories/mongoose')
const { RequestCatch: _catch } = require('../helpers')

exports.addCity = _catch(async (req = request, res = response) => {
  const city = await repository.addCity(req.body)

  res.status(200).json(city)
})

exports.getCities = _catch(async (req = request, res = response) => {
  const totalPromise = repository.countCities()
  const citiesPromise = repository.getCities({})
  const [total, cities] = await Promise.all([totalPromise, citiesPromise])
  res.status(200).json({
    total,
    ok: true,
    response: cities
  })
})
