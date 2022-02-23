const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper/test_helper')

const api = supertest(app)

describe('When there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('When fetching blogs', () =>{
    test('the correct number of blogs are returned', async () => {
      const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the id field is correctly named', async () => {
      const response = await helper.blogsInDb()
        expect(response[0].id).toBeDefined()
        expect(response[0]._id).not.toBeDefined()
    })
  })

  describe('Adding new blog', () => {
    test('Saves the blog and sets fields correctly', async () => {
      const blogContent = {
        author: "Someone",
        title: "Some title",
        url: "www.my.blog",
        likes: 1234
      }
      await api.post('/api/blogs').send(blogContent)
      const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
        expect(blogs[2]).toEqual(expect.objectContaining(blogContent))
    })

    test('sets likes to zero if not defined', async () => {
      const blogContent = {
        author: "Someone",
        title: "Some title",
        url: "www.my.blog"
      }
      await api.post('/api/blogs').send(blogContent)
      const blogs = await helper.blogsInDb()
        expect(blogs[2].likes).toEqual(0)
    })

    test('with no title returns 400', async () => {
      const blogContent = {
        author: "Someone",
        url: "www.my.blog",
        likes: 12
      }
      await api.post('/api/blogs').send(blogContent).expect(400)
    })

    test('with no rul returns 400', async () => {
      const blogContent = {
        title: "Someones blog",
        author: "someone",
        likes: 12
      }
      await api.post('/api/blogs').send(blogContent).expect(400)
    })
  })

  describe('Removing a blog', () => {
    test('with correct id reduces blog list length', async () => {
      const blogs =  await helper.blogsInDb()
      const blogCountbefore = blogs.length
      await api.delete(`/api/blogs/${blogs[0].id}`)
      const blogsAfter = await helper.blogsInDb()
      expect(blogsAfter.length).toEqual(blogCountbefore - 1)
    })

    test('with incorrect id returns 400', async () => {
      await api.delete(`/api/blogs/${helper.nonExistingId}`).expect(400)
    })
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
      await api.put(`/api/blogs/${blogs[0].id}`).send(blogContent)
      blogs = await helper.blogsInDb()
      expect(blogs[0]).toEqual(expect.objectContaining(blogContent))
    })

    test('with incorrect id returns 400', async () => {
      const blogContent = {
        author: "new name",
        title: "new title",
        url: "new url",
        likes: 42
      }
      await api.put(`/api/blogs/${helper.nonExistingId}`).send(blogContent).expect(400)
    })
  })

})
  afterAll(() => {
    mongoose.connection.close()
  })
