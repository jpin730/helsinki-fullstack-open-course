const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()

const HTTP_STATUS = require('../consts/http-status')
const User = require('../models/user')

usersRouter.get('/', async (_, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  return response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: 'password must be at least 3 characters long' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  return response.status(HTTP_STATUS.CREATED).json(savedUser)
})

module.exports = usersRouter
