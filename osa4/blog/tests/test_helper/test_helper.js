const Blog = require('../../models/blog')
const User = require('../../models/user')

const initialBlogs = [
    {
        author: "Aku Ankka",
        title: "butter factory times",
        url: "www.butter.quack",
        likes: 313
    },
    {
        author: "Douglas Adams",
        title: "Who is this God guy anyways?",
        url: "www.worlds.end",
        likes: 42
    }
  ]

  const nonExistingId = async () => {
    const blog = new Blog({ 
        title: 'willremovethissoon', 
        author: "something something", 
        url: "www.random.random", 
        likes: 1 })
    await blog.save()
    await blog.remove()
  
    return blog.id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
    
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

  module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
  }