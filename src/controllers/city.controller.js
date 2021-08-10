const { request, response } = require('express')

const { __catch } = require('../helpers')
const { cityRepository: repository } = require('../repositories/mongodb')

exports.getCities = __catch(async (req = request, res = response) => {
  const cities = await repository.getCities({ isActive: true })
  res.status(200).json({
    status: 200,
    ok: true,
    cities
  })
})

exports.getCityByName = __catch(async (req = request, res = response) => {
  const name = req.params.name || ''
  const result = await repository.getCities({ name })

  if (result.length === 0) {
    return res.status(404).json({
      error: `${req.params.name} was not found`,
      status: 404
    })
  }

  res.status(200).json({
    data: result[0],
    status: 200
  })
})

exports.addCity = __catch(async (req = request, res = response) => {
  const result = await repository.addCity(req.body)

  res.status(201).json({
    data: result,
    status: 201
  })
})

exports.updateCityByName = __catch(async (req = request, res = response) => {
  const name = req.params.name || ''
  if (req.method === 'DELETE') req.body.isActive = false
  const result = await repository.updateCityByName(name, req.body)

  if (!result) {
    return res.status(404).json({
      error: `${name} was not found`,
      status: 404
    })
  }

  res.status(200).json({
    city: result,
    status: 200,
    ok: true
  })
})
