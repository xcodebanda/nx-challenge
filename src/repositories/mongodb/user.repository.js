const User = require('../../models/mongodb/user.model')

exports.addUser = async values => await User.create(values)
exports.getTotal = async options => await User.countDocuments(options)
exports.getUserByID = async (id, fields) => await User.findById(id, fields)
exports.getUsers = async (options, fields) => await User.find(options, fields)
// exports.updateCityByName = async (name, values) => await City.findOneAndUpdate({ name }, values, { new: true })
