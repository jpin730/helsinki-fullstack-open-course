const jwt = require('jsonwebtoken')
const config = require('./config')

const generateJwt = (user) => {
  const payload = {
    username: user.username,
    sub: user._id,
  }

  const expirationInMinutes = 60
  const expirationInSeconds = expirationInMinutes * 60

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: expirationInSeconds,
  })
}

module.exports = generateJwt
