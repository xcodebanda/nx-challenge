const { request, response } = require('express')
const { __catch } = require('../../helpers')

const {
  mongoRepositories: {
    itineraryRepository: repository
  }
} = require('../../../database')

exports.getItineraries = __catch(async (req = request, res = response) => {
  let itineraries = await repository.getItineraries({})
  itineraries = itineraries.filter(itinerary => itinerary.isActive)
  res.status(200).json({
    data: itineraries,
    status: 200
  })
})

exports.getItineraryByTitle = __catch(async (req = request, res = response) => {
  const title = req.params.title || ''
  const result = await repository.getItineraries({ title })

  if (result.length === 0) {
    return res.status(404).json({
      error: `${title} was not found`,
      status: 404
    })
  }

  res.status(200).json({
    data: result[0],
    status: 200
  })
})

exports.addItinerary = __catch(async (req = request, res = response) => {
  const result = await repository.addItinerary(req.body)

  res.status(201).json({
    data: result.data,
    status: 201
  })
})

exports.updateItineraryById = __catch(async (req = request, res = response) => {
  const id = req.params.id || ''
  const itinerary = await repository.getItineraries({ _id: id })

  if (!itinerary) {
    return res.status(404).json({
      error: `${id} Not found`,
      status: 404
    })
  }

  if (req.method === 'DELETE') req.body.isActive = false
  const result = await repository.updateCityById(id, req.body)

  res.status(200).json({
    data: result,
    status: 200
  })
})
