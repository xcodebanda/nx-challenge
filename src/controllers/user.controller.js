const { hashSync, genSaltSync } = require('bcryptjs')
const { request, response } = require('express')

const { UserDTO } = require('../DTOs')
const { generateJWT } = require('../JWT')
const { __catch, RequestReponse } = require('../helpers')
const { userRepository: repository } = require('../repositories/mongodb')

exports.getUserByID = __catch(async (req = request, res = response) => {
  const user = await repository.getUserByID(req.params.id)

  if (!user) {
    return res.status(404).json(
      RequestReponse.fail('User not found', 404)
    )
  }

  res.status(200).json(
    RequestReponse.success(200, user)
  )
})

exports.getUsers = __catch(async (req = request, res = response) => {
  const opt = {}
  if (req.query.all !== '') opt.isActive = true

  const usersPromise = repository.getUsers(opt, {
    password: 0,
    __v: 0
  })

  const totalPromise = repository.getTotal(opt)
  const [users, total] = await Promise.all([usersPromise, totalPromise])

  const result = RequestReponse.success(200, users)
  result.total = total

  res.status(200).json(result)
})

exports.signUp = __catch(async (req = request, res = response) => {
  req.body.password = hashSync(req.body.password, genSaltSync(10))
  const result = await repository.addUser(req.body)

  const user = UserDTO.signUp(result)

  res.status(201).json(
    RequestReponse.success(201, user)
  )
})

exports.signIn = __catch(async (req = request, res = response) => {
  const user = await repository.getUsers({ email: req.body.email })

  const token = await generateJWT(
    UserDTO.token(user[0])
  )

  res.status(200).json(
    RequestReponse.success(200, token)
  )
})
