import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsAtStart = []

const sortByVotes = (array) => {
  return array.sort((a, b) => b.votes - a.votes)
}

const initialState = sortByVotes(blogsAtStart)

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      const content = action.payload
      state.push(content)
      sortByVotes(state)
    },
    deleteBlog(state, action) {
      const itemId = action.payload
      return state.filter(({ id }) => id !== itemId)
    },
    setBlogs(state, action) {
      console.log('set', action.payload)
      return sortByVotes(action.payload)
    },
    voteOn(state, action) {
      const id = action.payload
      const blogToVote = state.find((blog) => blog.id === id)
      console.log(state.blogs)
      console.log('voting', blogToVote)
      const changedBlog = {
        ...blogToVote,
        likes: blogToVote.likes + 1,
      }
      console.log('changed', changedBlog)
      return sortByVotes(
        state.map((blog) => (blog.id !== id ? blog : changedBlog))
      )
    },
  },
})

export const { addBlog, deleteBlog, setBlogs, voteOn } = blogsSlice.actions
export default blogsSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    console.log(`creating blog ${content}`)
    const newBlog = await blogService.create(content)
    dispatch(addBlog(newBlog))
  }
}

export const voteBlog = (blog, id) => {
  return async (dispatch) => {
    console.log(`updating blog ${blog} `)
    console.log(blog)
    const newAnecdote = await blogService.update(
      {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      },
      id
    )
    dispatch(voteOn(newAnecdote.id))
  }
}

export const updateBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    console.log('deleting from db', id)
    dispatch(deleteBlog(id))
  }
}
