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

  describe('When fetching blogs', () =>{
    test('the correct number of blogs are returned', async () => {
      const response = await api.get('/api/blogs').set('Authorization', token)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

  })

})
  afterAll(() => {
    mongoose.connection.close()
  })
