const mongoose = require('mongoose')
const { MongoServerError } = require('mongodb')
const jwt = require('jsonwebtoken')

const HTTP_STATUS = require('../consts/http-status')
const MONGO_ERROR = require('../consts/mongo-error')

const logger = require('../utils/logger')
const config = require('../utils/config')

const User = require('../models/user')

const errorHandler = (error, _, response, next) => {
  logger.error(`${error.name}: ${error.message}`)

  if (
    error instanceof mongoose.Error.CastError ||
    error instanceof mongoose.Error.ValidationError ||
    (error instanceof MongoServerError && error.code === MONGO_ERROR.DUPLICATE_KEY) ||
    error instanceof jwt.JsonWebTokenError
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

const tokenExtractor = (request, _, next) => {
  const authorizationHeader = request.get('authorization')
  let token = null
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    token = authorizationHeader.replace('Bearer ', '')
  }
  request.token = token

  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (!token) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'token missing' })
  }

  const tokenPayload = jwt.verify(token, config.JWT_SECRET)
  const userId = tokenPayload.sub
  if (!userId) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'token invalid' })
  }

  const user = await User.findById(userId)
  if (!user) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'token invalid' })
  }
  request.user = user
  next()
}

module.exports = { errorHandler, requestLogger, unknownEndpoint, tokenExtractor, userExtractor }
