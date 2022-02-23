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

    test('with no title returns 400', async () => {
      const blogContent = {
        author: "Someone",
        url: "www.my.blog",
        likes: 12
      }
      await api.post('/api/blogs').send(blogContent).set('Authorization', token).expect(400)
    })
  })

})
  afterAll(() => {
    mongoose.connection.close()
  })
