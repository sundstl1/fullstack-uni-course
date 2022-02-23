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
    

    test('the id field is correctly named', async () => {
      const response = await helper.blogsInDb()
        expect(response[0].id).toBeDefined()
        expect(response[0]._id).not.toBeDefined()
    })
  })
})
  afterAll(() => {
    mongoose.connection.close()
  })
