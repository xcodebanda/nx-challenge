const { User } = require('../../models/mongoose')

exports.getUserById = async id => await User.findById(id)
exports.getUsers = async options => await User.find(options)
exports.registerUser = async values => await User.create(values)
