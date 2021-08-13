const { request, response } = require('express')
const { hashSync, genSaltSync } = require('bcryptjs')

const { User: DTO } = require('../dtos')
const { generateJWT } = require('../auth')
const { RequestCatch: _catch } = require('../helpers')
const { User: repository } = require('../repositories/mongoose')

exports.signUp = _catch(async (req = request, res = response) => {
  req.body.password = hashSync(req.body.password, genSaltSync(10))
  const user = await repository.registerUser(req.body)

  const token = await generateJWT(user)

  res.status(201).json({
    response: {
      ...DTO.auth(user),
      token
    },
    success: true
  })
})

exports.signIn = _catch(async (req = request, res = response) => {
  const user = await repository.getUsers({ email: req.body.email })
  const token = await generateJWT(user[0])

  res.status(200).json({
    success: true,
    response: {
      ...DTO.auth(user[0]),
      token
    }
  })
})

exports.signInLS = (req = request, res = response) => {
  res.status(200).json({
    response: DTO.auth(req.user),
    success: true
  })
}
