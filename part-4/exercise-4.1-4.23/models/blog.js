const mongoose = require('mongoose')

const config = require('../utils/config')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const collectionName = config.NODE_ENV === 'testing' ? 'testBlogs' : 'blogs'

module.exports = mongoose.model('Blog', blogSchema, collectionName)
