const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/info', async (request, response) => {
  const result = await Blog.countDocuments({})

  const info = `Blogs have ${result} entries.`
  const date = new Date()
  response.send(`<p>${info}</p><p>${date}</p>`)
})

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })

  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const creator = await User.findById(decodedToken.id)

  const blog = new Blog({
    ...body,
    user: creator._id,
  })

  const result = await blog.save()

  creator.blogs = creator.blogs.concat(result._id)
  await creator.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const id = request.params.id

  const result = await Blog
    .findByIdAndUpdate(
      id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' })
  response.json(result)
})

module.exports = blogsRouter