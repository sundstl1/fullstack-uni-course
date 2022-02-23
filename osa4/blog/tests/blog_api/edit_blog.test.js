const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../app')
const helper = require('../test_helper/test_helper')
const setup = require('./setup')

const api = supertest(app)

let token

jest.retryTimes(10) //There the db can't quite keep up with what I want to do.

describe('When there are initially some blogs saved', () => {
  beforeAll(async () => {
    token = await setup.resetUser()
    await setup.resetBlogs(token)
  })

  describe('Editing a blog', () => {
    test('All fields are updated', async () => {
      const blogContent = {
        author: "new name",
        title: "new title",
        url: "new url",
        likes: 42
      }
      let blogs = await helper.blogsInDb()
      await api.put(`/api/blogs/${blogs[0].id}`).send(blogContent).set('Authorization', token).expect(200)
      blogs = await helper.blogsInDb()
      expect(blogs[0]).toEqual(expect.objectContaining(blogContent))
    })
  })

})
  afterAll(() => {
    mongoose.connection.close()
  })
