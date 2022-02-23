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

  describe('Removing a blog', () => {
    test('with correct id reduces blog list length', async () => {
      const blogs =  await helper.blogsInDb()
      const blogCountbefore = blogs.length
      const stuff = await api.delete(`/api/blogs/${blogs[0].id}`).set('Authorization', token)
      const blogsAfter = await helper.blogsInDb()
      expect(blogsAfter.length).toEqual(blogCountbefore - 1)
    })
  })

})
  afterAll(() => {
    mongoose.connection.close()
  })
