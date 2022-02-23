const supertest = require('supertest')
const Blog = require('../../models/blog')
const User = require('../../models/user')
const helper = require('../test_helper/test_helper')
const app = require('../../app')

const api = supertest(app)

const resetBlogs = (async (token) => {
    await Blog.deleteMany({})   
    helper.initialBlogs.forEach(async blog => {
      const blogContent = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes
      }
      const stuff = await api.post('/api/blogs').send(blogContent).set('Authorization', token)
    });
  })

  const resetUser = (async () => {
    await User.deleteMany({})

    const user = {
      username: "testUser",
      name: "my name",
      password: "secret"
    }
    await api.post('/api/users').send(user)

    const login = await api.post('/api/login').send({
      username: user.username,
      password: user.password
    })
    const token = `bearer ${login.body.token}`

    return token
  })

  module.exports = {
    resetBlogs,
    resetUser,
  }