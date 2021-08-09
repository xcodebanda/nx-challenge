const User = require('./user.model')

/**
 *  Data Access Logic
 */

exports.getUsers = async (options) => await User.find(
  options.filters,
  options.fields
    ? options.fields
    : null
)
exports.addUser = async (values) => await User.create(values)
exports.updateUserById = async (id, values) => await User.findByIdAndUpdate(id, values)
