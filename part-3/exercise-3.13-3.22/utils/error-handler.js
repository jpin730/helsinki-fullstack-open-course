const mongoose = require('mongoose')

const HTTP_STATUS = require('../consts/http-status')

const errorHandler = (error, _, response, next) => {
  console.error(error.message)

  if (error instanceof mongoose.Error.CastError) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message })
  }

  next(error)
}

module.exports = errorHandler
