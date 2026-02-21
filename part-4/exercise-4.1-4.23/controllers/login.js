const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()

const HTTP_STATUS = require('../consts/http-status')
const generateJwt = require('../utils/generate-jwt')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  if (!user) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: 'invalid username or password',
    })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordCorrect) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: 'invalid username or password',
    })
  }

  const token = generateJwt(user)

  const { name } = user

  response.status(HTTP_STATUS.OK).send({ token, username, name })
})

module.exports = loginRouter
