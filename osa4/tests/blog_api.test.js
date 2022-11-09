const mongoose = require('mongoose')
const supertest = require('supertest')
const { initialBlogs, blogsInDb, existingId } = require('./dbData')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

afterAll(() => {
  mongoose.connection.close()
})

describe('when getting info', () => {
  test('info is returned', async () => {
    await api
      .get('/api/blogs/info')
      .expect(200)
  })

  test('count of blogs is returned', async () => {
    const response = await api.get('/api/blogs/info')
    expect(response.text).toContain('<p>Blogs have 2 entries.</p>')
  })
})

describe('when querying list of blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a specific blog is returned first', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('React patterns')
  })
})

describe('when querying individual blog', () => {
  test('blog is return with known id', async () => {
    const id = await existingId()
    await api
      .get(`/api/blogs/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unknown id does not return blog', async () => {
    await api
      .get('/api/blogs/111111111111111111111111')
      .expect(404)
  })

  test('response has blog id in field called id', async () => {
    const id = await existingId()
    const response = await api.get(`/api/blogs/${id}`)

    expect(response.body.id).toBeDefined()
    expect(response.body.id).toBe(id)
  })
})

describe('when adding new blog', () => {
  test('a valid blog is added ', async () => {
    const blog = {
      title: 'Added in tests',
      author: 'testrunner',
      url: 'http://url.com',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length + 1)
  })

  test('invalid blog is not added', async () => {
    await api
      .post('/api/blogs')
      .send({ author: 'foobar' })
      .expect(400)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length)
  })

  test('blog likes defaults to 0', async () => {
    const blog = {
      title: 'Added in tests',
      author: 'testrunner',
      url: 'http://url.com',
    }
    const response = await api
      .post('/api/blogs')
      .send(blog)

    expect(response.body.likes).toBe(0)
  })
})

describe('when deleting a blog', () => {
  test('an existing blog is deleted', async () => {
    const id = await existingId()
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length - 1)
  })

  test('non existing id removes nothing', async () => {
    await api
      .delete('/api/blogs/111111111111111111111111')
      .expect(204)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length)
  })
})
