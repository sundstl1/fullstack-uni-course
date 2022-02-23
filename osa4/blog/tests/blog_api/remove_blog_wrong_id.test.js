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
    token = await setup.resetUser(api)
    await setup.resetBlogs(token, api)
  })

  describe('Removing a blog', () => {

    test('with incorrect id returns 404', async () => {
      const stuff = await api.delete(`/api/blogs/${await helper.nonExistingId()}`).set('Authorization', token).expect(404)
    })
  })

})
  afterAll(() => {
    mongoose.connection.close()
  })
