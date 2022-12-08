const mongoose = require('mongoose')
const supertest = require('supertest')
const {
  initialBlogs,
  blogsInDb,
  existingBlogId,
  initialUsers,
  userToken,
} = require('./dbData')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let creatorToken
let nonCreatorToken

beforeEach(async () => {
  await User.deleteMany({})
  const result = await User.insertMany(initialUsers)

  const creator = result[0]
  const user = result[1]

  creatorToken = userToken(creator)
  nonCreatorToken = userToken(user)

  initialBlogs.forEach((blog) => {
    blog.user = creator._id
  })

  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

afterAll(() => {
  mongoose.connection.close()
})

describe('when getting info', () => {
  test('info is returned', async () => {
    await api.get('/api/blogs/info').expect(200)
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
    const id = await existingBlogId()
    await api
      .get(`/api/blogs/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unknown id does not return blog', async () => {
    await api.get('/api/blogs/111111111111111111111111').expect(404)
  })

  test('invalid id returns error', async () => {
    await api.get('/api/blogs/1').expect(400)
  })

  test('response has blog id in field called id', async () => {
    const id = await existingBlogId()
    const response = await api.get(`/api/blogs/${id}`)

    expect(response.body.id).toBeDefined()
    expect(response.body.id).toBe(id)
  })
})

describe('when adding new blog', () => {
  test('adding a blog requires authenticated user', async () => {
    const blog = {
      title: 'Added in tests',
      author: 'testrunner',
      url: 'http://url.com',
      likes: 3,
    }

    await api.post('/api/blogs').send(blog).expect(401)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length)
  })

  test('a valid blog is added when user is logged in', async () => {
    const blog = {
      title: 'Added in tests',
      author: 'testrunner',
      url: 'http://url.com',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${creatorToken}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length + 1)
  })

  test('invalid blog is not added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${creatorToken}`)
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
      .set('Authorization', `bearer ${creatorToken}`)
      .send(blog)

    expect(response.body.likes).toBe(0)
  })
})

describe('when deleting a blog', () => {
  test('removing blog requires authenticated user', async () => {
    const id = await existingBlogId()
    await api.delete(`/api/blogs/${id}`).expect(401)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length)
  })
  test('an existing blog is deleted if creator is authenticated user', async () => {
    const id = await existingBlogId()
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `bearer ${creatorToken}`)
      .expect(204)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length - 1)
  })

  test('an existing blog is not deleted if authenticated user is not the creator', async () => {
    const id = await existingBlogId()
    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `bearer ${nonCreatorToken}`)
      .expect(403)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length)
  })

  test('non existing id removes nothing', async () => {
    await api
      .delete('/api/blogs/111111111111111111111111')
      .set('Authorization', `bearer ${creatorToken}`)
      .expect(404)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length)
  })
})
describe('when updating a blog', () => {
  test('an existing blog is updated', async () => {
    const origs = await blogsInDb()

    // to get dates as strings
    const originalBlog = JSON.parse(JSON.stringify(origs[0]))

    const blog = {
      ...originalBlog,
      title: 'Updated in tests',
      author: 'updated testrunner',
      url: 'http://updated.com',
    }

    const result = await api
      .put(`/api/blogs/${originalBlog.id}`)
      .send(blog)
      .expect(200)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length)
    expect(result.body.title).toBe('Updated in tests')
    expect(result.body.author).toBe('updated testrunner')
    expect(result.body.url).toBe('http://updated.com')
    expect(result.body.likes).toBe(originalBlog.likes)
    expect(result.body.createdAt).toBe(originalBlog.createdAt)
    expect(result.body.updatedAt).not.toBe(originalBlog.updatedAt)
  })

  test('likes of an existing blog are updated', async () => {
    const origs = await blogsInDb()

    // to get dates as strings
    const originalBlog = JSON.parse(JSON.stringify(origs[0]))

    const blog = {
      ...originalBlog,
      likes: 666,
    }

    const result = await api
      .put(`/api/blogs/${originalBlog.id}`)
      .send(blog)
      .expect(200)

    const inDb = await blogsInDb()
    expect(inDb).toHaveLength(initialBlogs.length)
    expect(result.body.likes).toBe(666)
    expect(result.body.createdAt).toBe(originalBlog.createdAt)
    expect(result.body.updatedAt).not.toBe(originalBlog.updatedAt)
  })

  test('non existing id updates nothing', async () => {
    const origs = await blogsInDb()

    // to get dates as strings
    const originalBlog = JSON.parse(JSON.stringify(origs[0]))

    const blog = {
      ...originalBlog,
      likes: 666,
    }

    await api.put('/api/blogs/111111111111111111111111').send(blog).expect(404)
  })
})
