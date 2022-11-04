const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/info', (request, response) => {
  Blog.countDocuments({}).then(result => {
    const info = `Blogs have ${result} entries.`
    const date = new Date()
    response.send(`<p>${info}</p><p>${date}</p>`)
  })
})

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog
    .findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    ...body,
  })

  blog
    .save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog
    .findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url } = request.body
  const id = request.params.id

  Blog
    .findByIdAndUpdate(
      id,
      { title, author, url },
      { new: true, runValidators: true, context: 'query' })
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter