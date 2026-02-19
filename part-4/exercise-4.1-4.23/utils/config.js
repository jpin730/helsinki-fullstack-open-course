const NODE_ENV = process.env.NODE_ENV

process.loadEnvFile(NODE_ENV === 'testing' ? '.env.test.local' : '.env')

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

module.exports = { MONGODB_URI, NODE_ENV, PORT }
