const blogsRouter = require('express').Router()
const { userExtractor } = require('../middleware/userExtractor')
const Blog = require('../models/blog')

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
  const result = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })

  if (result) {
    response.json(result)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const creator = await request.user

  const blog = new Blog({
    ...body,
    user: creator._id,
  })

  const result = await blog.save()

  creator.blogs = creator.blogs.concat(result._id)
  await creator.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = await request.user

  if (!blog) {
    response.status(404).end()
  } else if (blog.user.toString() === user.id) {
    blog.remove()
    response.status(204).end()
  } else {
    response.status(403).json({ error: 'no permission to remove' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const id = request.params.id

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  } else {
    const result = await Blog.findByIdAndUpdate(
      id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' }
    )
    response.json(result)
  }
})

module.exports = blogsRouter
