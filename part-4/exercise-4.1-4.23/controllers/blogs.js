const blogsRouter = require('express').Router()

const HTTP_STATUS = require('../consts/http-status')
const Blog = require('../models/blog')

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  return response.status(HTTP_STATUS.CREATED).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    return response.status(HTTP_STATUS.NOT_FOUND).end()
  }
  return response.status(HTTP_STATUS.NO_CONTENT).end()
})

module.exports = blogsRouter
