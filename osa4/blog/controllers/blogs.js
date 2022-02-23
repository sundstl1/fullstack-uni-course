const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { blogsInDb } = require('../tests/test_helper/test_helper')
const req = require('express/lib/request')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  })
  
  blogsRouter.post('/', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' }).end()
    }
    const body = request.body
    const userId = request.userId
    
    const user = await User.findById(userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' }).end()
    }

    const userId = request.userId
    const blog = await Blog.findById(request.params.id)
    if (!blog){
      response
      .status(404).end()
    }
    if ( blog.user.toString() !== userId.toString() ){
      response.status(401).end()
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const userId = request.userId
    const blog = await Blog.findById(request.params.id)
    if (!blog){
      response
      .status(404).end()
    }
    if ( blog.user.toString() !== userId.toString() ){
      response.status(401).end()
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      },
      { new: true }
    )
    response.json(updatedBlog)
  })
  

  module.exports = blogsRouter