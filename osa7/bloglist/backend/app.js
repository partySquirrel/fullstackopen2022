const express = require('express')
require('express-async-errors')
const app = express()

const cors = require('cors')
const morgan = require('morgan')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const { apiErrorHandler, unknownEndpoint } = require('./utils/apiErrorHandler')
const { tokenExtractor } = require('./middleware/tokenExtractor')

// connect to mongo DB
require('./config/mongo')()

app.use(cors())
app.use(express.json())

// api request logging
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const tests = require('./controllers/tests')
  app.use('/api/tests', tests)
}

app.use(unknownEndpoint)
app.use(apiErrorHandler)

module.exports = app