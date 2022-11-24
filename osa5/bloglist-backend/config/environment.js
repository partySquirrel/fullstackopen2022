require('dotenv').config()

let PORT = process.env.PORT
let ENVIRONMENT = process.env.NODE_ENV

const MONGODB_URI = ENVIRONMENT === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  ENVIRONMENT,
}