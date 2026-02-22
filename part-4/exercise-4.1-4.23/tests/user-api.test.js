const { after, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const HTTP_STATUS = require('../consts/http-status')
const User = require('../models/user')
const helper = require('./test-helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await helper.initUser()
})

describe('POST /api/users', () => {
  test('a valid user can be created', async () => {
    const usersAtStart = await helper.getUsersInDb()

    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'testpass',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(HTTP_STATUS.CREATED)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.getUsersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('created user does not expose passwordHash', async () => {
    const newUser = {
      username: 'secureuser',
      name: 'Secure User',
      password: 'validpassword',
    }

    const response = await api.post('/api/users').send(newUser).expect(HTTP_STATUS.CREATED)

    assert.strictEqual(response.body.passwordHash, undefined)
  })

  test('creation fails with BAD REQUEST if username is missing', async () => {
    const usersAtStart = await helper.getUsersInDb()

    const newUser = {
      name: 'No Username',
      password: 'validpass',
    }

    const response = await api.post('/api/users').send(newUser).expect(HTTP_STATUS.BAD_REQUEST)

    assert(response.body.error)

    const usersAtEnd = await helper.getUsersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with BAD REQUEST if username is shorter than 3 characters', async () => {
    const usersAtStart = await helper.getUsersInDb()

    const newUser = {
      username: 'ab',
      name: 'Short Username',
      password: 'validpass',
    }

    const response = await api.post('/api/users').send(newUser).expect(HTTP_STATUS.BAD_REQUEST)

    assert(response.body.error)

    const usersAtEnd = await helper.getUsersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with BAD REQUEST if password is missing', async () => {
    const usersAtStart = await helper.getUsersInDb()

    const newUser = {
      username: 'nopassuser',
      name: 'No Password',
    }

    const response = await api.post('/api/users').send(newUser).expect(HTTP_STATUS.BAD_REQUEST)

    assert.strictEqual(response.body.error, 'password must be at least 3 characters long')

    const usersAtEnd = await helper.getUsersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with BAD REQUEST if password is shorter than 3 characters', async () => {
    const usersAtStart = await helper.getUsersInDb()

    const newUser = {
      username: 'shortpass',
      name: 'Short Password',
      password: 'ab',
    }

    const response = await api.post('/api/users').send(newUser).expect(HTTP_STATUS.BAD_REQUEST)

    assert.strictEqual(response.body.error, 'password must be at least 3 characters long')

    const usersAtEnd = await helper.getUsersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with BAD REQUEST if username is already taken', async () => {
    const usersAtStart = await helper.getUsersInDb()

    const duplicateUser = {
      username: 'root',
      name: 'Duplicate Root',
      password: 'validpass',
    }

    const response = await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(HTTP_STATUS.BAD_REQUEST)

    assert.match(response.body.error, /^E11000 duplicate key.+username.+/)

    const usersAtEnd = await helper.getUsersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
