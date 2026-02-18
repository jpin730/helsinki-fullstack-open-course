const blogsRouter = require('express').Router();

const HTTP_STATUS = require('../consts/http-status');
const Blog = require('../models/blog');

blogsRouter.get('/', (_, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);
  blog.save().then((result) => response.status(HTTP_STATUS.CREATED).json(result));
});

module.exports = blogsRouter;
