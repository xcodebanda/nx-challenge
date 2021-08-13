const { City } = require('../../models/mongoose')

exports.countCities = async () => await City.countDocuments()
exports.getCities = async options => await City.find(options)
exports.addCity = async values => await City.create(values)
exports.getCityById = async id => await City.findById(id)
