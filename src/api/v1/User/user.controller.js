const { request, response } = require('express')
const { __catch } = require('../../helpers')
const UserDTO = require('./userDTO')

const {
  mongoRepositories: {
    userRepository: repository
  }
} = require('../../../database')

exports.getUsers = __catch(async (req = request, res = response) => {
  let users = await repository.getUsers({})
  users = users.filter(user => user.isActive)
  res.status(200).json({
    data: users,
    status: 200
  })
})

exports.getUserById = __catch(async (req = request, res = response) => {
  const _id = req.params.id || ''
  const result = await repository.getUsers({ _id })

  if (result.length === 0) {
    return res.status(404).json({
      error: `${_id} was not found`,
      status: 404
    })
  }

  res.status(200).json({
    data: result[0],
    status: 200
  })
})

exports.addUser = __catch(async (req = request, res = response) => {
  const result = await repository.addUser(req.body)

  const data = new UserDTO(
    result.firstName,
    result.lastName,
    result.email,
    result.img
  )

  res.status(201).json({
    status: 201,
    data
  })
})

exports.updateUserById = __catch(async (req = request, res = response) => {
  const _id = req.params.id || ''
  const itinerary = await repository.getUsers({ _id })

  if (!itinerary) {
    return res.status(404).json({
      error: `${_id} Not found`,
      status: 404
    })
  }

  if (req.method === 'DELETE') req.body.isActive = false
  const result = await repository.updateUserById(_id, req.body)

  res.status(200).json({
    data: result,
    status: 200
  })
})
