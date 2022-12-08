const mongoose = require('mongoose')
const logger = require('../utils/logger')
const { MONGODB_URI } = require('./environment')

logger.info('connecting to', MONGODB_URI)

module.exports = function () {
  mongoose.connect(MONGODB_URI, function (error) {
    if (error) logger.error('error connection to MongoDB:', error.message)
  })

  const connection = mongoose.connection
  connection.once('open', () => {
    logger.info('connected to MongoDB')
  })
}