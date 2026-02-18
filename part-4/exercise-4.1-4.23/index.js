const express = require('express');
const mongoose = require('mongoose');

const HTTP_STATUS = require('./consts/http-status');

process.loadEnvFile();

const app = express();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 }).then(() =>
  // TODO: Remove console.log and use a logger instead
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB'),
);

app.use(express.json());

app.get('/api/blogs', (_, response) => {
  Blog.find({}).then((blogs) => response.json(blogs));
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);
  blog.save().then((result) => response.status(HTTP_STATUS.CREATED).json(result));
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  // TODO: Remove console.log and use a logger instead
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`),
);
