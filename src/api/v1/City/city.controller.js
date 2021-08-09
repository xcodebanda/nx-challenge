const { request, response } = require('express')
const { __catch } = require('../../helpers')
const service = require('./city.service')

exports.getCities = __catch(async (req = request, res = response) => {
  const data = await service.getCities(req)
  res.status(200).json({
    status: 200,
    data
  })
})

exports.getCityByName = __catch(async (req = request, res = response) => {
  const result = await service.getCities(req)

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
  const result = await service.addCity(req.body)

  if (!result.success) {
    return res.status(400).json({
      errors: result.errors,
      status: 400
    })
  }

  res.status(201).json({
    data: result.data,
    status: 201
  })
})

exports.updateCityById = __catch(async (req = request, res = response) => {
  const result = await service.updateCityById(req)

  if (!result.success) {
    return res.status(404).json({
      error: result.error,
      status: 404
    })
  }

  res.status(200).json({
    data: result.data,
    status: 200
  })
})
