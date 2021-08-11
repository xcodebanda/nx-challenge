const { request, response } = require('express')

const { __catch, RequestReponse } = require('../helpers')
const { cityRepository: repository } = require('../repositories/mongodb')

exports.getCities = __catch(async (req = request, res = response) => {
  const opt = {}
  if (req.query.all !== '') opt.isActive = true

  const totalPromise = repository.getTotal(opt)
  const citiesPromise = repository.getCities(opt)

  const [cities, total] = await Promise.all([citiesPromise, totalPromise])
  const result = RequestReponse.success(200, cities)

  result.total = total
  res.status(200).json(result)
})

exports.getCityByName = __catch(async (req = request, res = response) => {
  const result = await repository.getCities({ name: req.params.name })

  if (result.length === 0) {
    return res.status(404).json(
      RequestReponse.fail(`${req.params.name} was not found`, 404)
    )
  }

  res.status(200).json(
    RequestReponse.success(200, result[0])
  )
})

exports.addCity = __catch(async (req = request, res = response) => {
  const result = await repository.addCity(req.body)

  res.status(201).json(
    RequestReponse.success(201, result)
  )
})

exports.updateCityByName = __catch(async (req = request, res = response) => {
  if (req.method === 'DELETE') req.body.isActive = false
  const result = await repository.updateCityByName(req.params.name, req.body)

  if (!result) {
    return res.status(404).json(
      RequestReponse.fail(`${req.params.name} was not found`, 404)
    )
  }

  res.status(200).json(
    RequestReponse.success(200, result)
  )
})
