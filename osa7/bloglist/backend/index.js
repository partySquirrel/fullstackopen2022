const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')
const { ENVIRONMENT, PORT } = require('./config/environment')

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Using ${ENVIRONMENT} environment`)
  logger.info(`Server running on port ${PORT}`)
})
