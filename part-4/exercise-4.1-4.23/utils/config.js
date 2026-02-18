process.loadEnvFile();

const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

module.exports = { MONGODB_URI, NODE_ENV, PORT };
