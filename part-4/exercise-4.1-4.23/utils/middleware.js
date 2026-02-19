const mongoose = require('mongoose')

const HTTP_STATUS = require('../consts/http-status')

const logger = require('../utils/logger')

const errorHandler = (error, _, response, next) => {
  logger.error(error.message)

  if (
    error instanceof mongoose.Error.CastError ||
    error instanceof mongoose.Error.ValidationError
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
