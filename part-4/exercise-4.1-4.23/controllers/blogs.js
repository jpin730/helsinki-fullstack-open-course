const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const HTTP_STATUS = require('../consts/http-status')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
  const authorizationHeader = request.get('authorization')
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    return authorizationHeader.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  if (!token) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'token missing' })
  }

  const tokenPayload = jwt.verify(token, config.JWT_SECRET)
  const userId = tokenPayload.sub
  if (!userId) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'token invalid' })
  }

  const user = await User.findById(userId)
  if (!user) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  })
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(HTTP_STATUS.CREATED).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    returnDocument: 'after',
    runValidators: true,
  })
  if (!updatedBlog) {
    return response.status(HTTP_STATUS.NOT_FOUND).end()
  }
  return response.status(HTTP_STATUS.NO_CONTENT).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    return response.status(HTTP_STATUS.NOT_FOUND).end()
  }
  return response.status(HTTP_STATUS.NO_CONTENT).end()
})

module.exports = blogsRouter
