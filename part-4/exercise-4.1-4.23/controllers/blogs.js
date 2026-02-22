const blogsRouter = require('express').Router()

const HTTP_STATUS = require('../consts/http-status')
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user

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

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(HTTP_STATUS.NOT_FOUND).end()
  }

  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response
      .status(HTTP_STATUS.FORBIDDEN)
      .json({ error: 'only the creator can delete a blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  return response.status(HTTP_STATUS.NO_CONTENT).end()
})

module.exports = blogsRouter
