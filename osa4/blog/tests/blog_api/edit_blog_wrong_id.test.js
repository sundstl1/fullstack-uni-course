const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const helper = require('../test_helper/test_helper')
const setup = require('./setup')

const api = supertest(app)

let token

jest.retryTimes(3) //There the db can't quite keep up with what I want to do.

describe('Editing a blog', () => {
  beforeAll(async () => {
    token = await setup.resetUser()
    await setup.resetBlogs(token)
  })

  test('with incorrect id returns 400', async () => {
    const blogContent = {
      author: "new name",
      title: "new title",
      url: "new url",
      likes: 42
    }
    var stuff = await api.put(`/api/blogs/${await helper.nonExistingId()}`).send(blogContent).set('Authorization', token).expect(404)
  })

})
  afterAll(() => {
    mongoose.connection.close()
  })
