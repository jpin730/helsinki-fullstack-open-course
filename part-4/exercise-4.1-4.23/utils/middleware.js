const mongoose = require('mongoose')
const { MongoServerError } = require('mongodb')
const { JsonWebTokenError } = require('jsonwebtoken')

const HTTP_STATUS = require('../consts/http-status')
const MONGO_ERROR = require('../consts/mongo-error')

const logger = require('../utils/logger')

const errorHandler = (error, _, response, next) => {
  logger.error(`${error.name}: ${error.message}`)

  if (
    error instanceof mongoose.Error.CastError ||
    error instanceof mongoose.Error.ValidationError ||
    (error instanceof MongoServerError && error.code === MONGO_ERROR.DUPLICATE_KEY) ||
    error instanceof JsonWebTokenError
  ) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message })
  }

  if (error.message) {
    return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }

  next(error)
}

const requestLogger = (request, _, next) => {
  const { method, path: url } = request
  const body =
    request.body && Object.keys(request.body).length > 0 ? JSON.stringify(request.body) : ''
  logger.info(method, url, body)
  next()
}

const unknownEndpoint = (_, response) =>
  response.status(HTTP_STATUS.NOT_FOUND).send({ error: 'unknown endpoint' })

module.exports = { errorHandler, requestLogger, unknownEndpoint }
