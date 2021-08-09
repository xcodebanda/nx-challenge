const City = require('./city.model')

/**
 *  Data Access Logic
 */

exports.getCities = async options => await City.find(
  options.filters,
  options.fields
    ? options.fields
    : null
)

exports.addCity = async values => await City.create(values)
exports.updateCityById = async (id, values) => await City.findByIdAndUpdate(id, values, { new: true })
