const mongoose = require('mongoose')
const supertest = require('supertest')
const { initialUsers, usersInDb, existingUserId } = require('./dbData')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

afterAll(() => {
  mongoose.connection.close()
})

describe('when querying list of users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('a specific user is returned first', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].name).toBe('Foo Bar')
  })
})

describe('when querying individual user', () => {
  test('user is return with known id', async () => {
    const id = await existingUserId()
    await api
      .get(`/api/users/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unknown id does not return user', async () => {
    await api
      .get('/api/users/111111111111111111111111')
      .expect(404)
  })

  test('invalid id returns error', async () => {
    await api
      .get('/api/users/1')
      .expect(400)
  })

  test('response has user id in field called id', async () => {
    const id = await existingUserId()
    const response = await api.get(`/api/users/${id}`)

    expect(response.body.id).toBeDefined()
    expect(response.body.id).toBe(id)
  })
})

describe('when adding new user', () => {
  test('a valid user is added ', async () => {
    const user = {
      username:'tester',
      name: 'Test Runner',
      password: 'testz'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const inDb = await usersInDb()
    expect(inDb).toHaveLength(initialUsers.length + 1)
  })

  test('invalid user is not added', async () => {
    const response = await api
      .post('/api/users')
      .send({ name: 'something' })
      .expect(400)

    expect(response.body.error).toContain('username or password is missing')

    const inDb = await usersInDb()
    expect(inDb).toHaveLength(initialUsers.length)
  })

  test('user with duplicate username is not added', async () => {
    const user = {
      username:'foobar',
      name: 'Foo Bar 2',
      password: 'foobaz2'
    }
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(response.body.error).toContain('username must be unique')
  })
})

describe('when deleting a user', () => {
  test('an existing user is deleted', async () => {
    const id = await existingUserId()
    await api
      .delete(`/api/users/${id}`)
      .expect(204)

    const inDb = await usersInDb()
    expect(inDb).toHaveLength(initialUsers.length - 1)
  })

  test('non existing id removes nothing', async () => {
    await api
      .delete('/api/users/111111111111111111111111')
      .expect(204)

    const inDb = await usersInDb()
    expect(inDb).toHaveLength(initialUsers.length)
  })
})