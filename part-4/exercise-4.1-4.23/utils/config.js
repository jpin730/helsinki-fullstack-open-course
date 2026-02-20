const NODE_ENV = process.env.NODE_ENV

process.loadEnvFile(NODE_ENV === 'testing' ? '.env.test.local' : '.env')

const JWT_SECRET = process.env.JWT_SECRET
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

module.exports = { JWT_SECRET, MONGODB_URI, NODE_ENV, PORT }
