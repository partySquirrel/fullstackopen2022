const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/info', async (request, response) => {
  const result = await Blog.countDocuments({})

  const info = `Blogs have ${result} entries.`
  const date = new Date()
  response.send(`<p>${info}</p><p>${date}</p>`)
})

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id)

  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    ...body,
  })

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url } = request.body
  const id = request.params.id

  const result = await Blog
    .findByIdAndUpdate(
      id,
      { title, author, url },
      { new: true, runValidators: true, context: 'query' })
  response.json(result)
})

module.exports = blogsRouter