const mongoose = require('mongoose');

const config = require('../utils/config');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const collectionName = config.NODE_ENV === 'testing' ? 'testBlogs' : 'blogs';

module.exports = mongoose.model('Blog', blogSchema, collectionName);
