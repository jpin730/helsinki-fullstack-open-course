const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginRouter = require('express').Router()

const HTTP_STATUS = require('../consts/http-status')
const config = require('../utils/config')
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

  const payload = {
    username: user.username,
    sub: user._id,
  }

  const expirationInMinutes = 60
  const expirationInSeconds = expirationInMinutes * 60

  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: expirationInSeconds,
  })

  const { name } = user

  response.status(HTTP_STATUS.OK).send({ token, username, name })
})

module.exports = loginRouter
