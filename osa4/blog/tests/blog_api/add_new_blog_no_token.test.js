const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const helper = require('../test_helper/test_helper')
const setup = require('./setup')

const api = supertest(app)

let token

jest.retryTimes(3) //There the db can't quite keep up with what I want to do.

describe('When there are initially some blogs saved', () => {
  beforeAll(async () => {
    token = await setup.resetUser()
    await setup.resetBlogs(token)
  })

  describe('Adding new blog', () => {
    test('returns 401 with no token', async () => {
      const blogContent = {
        author: "Someone",
        title: "Some title",
        url: "www.my.blog",
        likes: 1234
      }
      await api.post('/api/blogs').send(blogContent).expect(401)
  })

})
  afterAll(() => {
    mongoose.connection.close()
  })
})
