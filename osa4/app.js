const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const blogsRouter = require('./controllers/blogs')
const { apiErrorHandler, unknownEndpoint } = require('./utils/apiErrorHandler')

// connect to mongo DB
require('./config/mongo')()

app.use(cors())
app.use(express.json())

// api request logging
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(apiErrorHandler)

module.exports = app