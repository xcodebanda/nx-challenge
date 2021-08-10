const City = require('../../models/mongodb/city.model')

exports.addCity = async values => await City.create(values)
exports.getCities = async options => await City.find(options)
exports.updateCityByName = async (name, values) => await City.findOneAndUpdate({ name }, values, { new: true })
