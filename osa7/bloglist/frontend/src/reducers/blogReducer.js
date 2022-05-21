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
    setBlogs(state, action) {
      console.log('set', action.payload)
      return sortByVotes(action.payload)
    },
    voteOn(state, action) {
      const id = action.payload
      const blogToVote = state.find((a) => a.id === id)
      const changedBlog = {
        ...blogToVote,
        votes: blogToVote.votes + 1,
      }
      return sortByVotes(
        state.map((blog) => (blog.id !== id ? blog : changedBlog))
      )
    },
  },
})

export const { addBlog, setBlogs, voteOn } = blogsSlice.actions
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
    const newBlog = await blogService.createNew(content)
    dispatch(addBlog(newBlog))
  }
}

export const updateBlog = (blog, id, votes) => {
  return async (dispatch) => {
    console.log(`updating blog ${blog.content} ${votes}`)
    const newAnecdote = await blogService.update(blog, id)
    dispatch(voteOn(newAnecdote.id))
  }
}

export const updateBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log('blogs', blogs)
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}
