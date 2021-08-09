const {
  mongoRepositories: {
    cityRepository: repository
  }
} = require('../../../database')

/**
 * Business Logic
 */

exports.addCity = async values => {
  const errors = []
  const { img, name, country } = values

  if (name) {
    const city = await repository.getCities({ name })
    if (city.length > 0) errors.push(`${values.name} already exists`)
  } else {
    errors.push('Name is required')
  }

  if (!img) errors.push('Image is required')
  if (!country) errors.push('Country is required')

  if (errors.length > 0) return { success: false, errors }

  const city = await repository.addCity({ img, name, country })
  return { success: true, data: city }
}

exports.updateCityById = async ({ params, body, method }) => {
  const city = await repository.getCities({ _id: params.id })
  console.log(city, method)
  if (city.length === 0) {
    return {
      error: `Id ${params.id} was not found`,
      success: false
    }
  }

  const news = {}
  if (body.img) news.img = body.img
  if (body.name) news.name = body.name
  if (body.country) news.country = body.country

  if (body.isActive) news.isActive = true
  if (method === 'DELETE') news.isActive = false

  const updatedCity = await repository.updateCityById(params.id, { ...city, ...news })
  return { success: true, data: updatedCity }
}

exports.getCities = async ({ params, query }) => {
  const options = { filters: {} }

  if (params.name) options.filters.name = params.name
  if (query.fields) options.fields = query.fields.split(',')
  if (query.country) options.filters.country = query.country

  let cities = await repository.getCities(options)
  if (query.full !== '') cities = cities.filter(city => city.isActive)

  return cities
}
