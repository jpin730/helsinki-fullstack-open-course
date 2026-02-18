const express = require('express');
const mongoose = require('mongoose');

const HTTP_STATUS = require('./consts/http-status');

const logger = require('./utils/logger');
const config = require('./utils/config');

process.loadEnvFile();

const app = express();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 }).then(() => logger.info('Connected to MongoDB'));

app.use(express.json());

app.get('/api/blogs', (_, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);
  blog.save().then((result) => response.status(HTTP_STATUS.CREATED).json(result));
});

const PORT = config.PORT;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
