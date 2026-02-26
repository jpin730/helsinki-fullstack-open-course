const router = require('express').Router()

const HTTP_STATUS = require('../consts/http-status')
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (_, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  return response.status(HTTP_STATUS.NO_CONTENT).end()
})

module.exports = router
