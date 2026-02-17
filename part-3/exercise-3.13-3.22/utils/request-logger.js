const requestLogger = (tokens, req, res) => {
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const status = tokens.status(req, res)
  const contentLength = tokens.res(req, res, 'content-length')
  const responseTime = tokens['response-time'](req, res)
  const body = req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : ''

  return `${method} ${url} ${status} ${contentLength} - ${responseTime} ms ${body}`
}

module.exports = requestLogger
