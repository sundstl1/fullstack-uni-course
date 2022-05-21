import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import Notification from './components/notification'
import Togglable from './components/toggleable'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogs } from './reducers/blogReducer'
import { setActiveUser, logout } from './reducers/userReducer'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(updateBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setActiveUser())
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification className="userMessage" />
      <LoginForm />
    </div>
  )

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <Notification className="userMessage" />
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>

      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} username={user.username} />
      ))}
    </div>
  )
  return <div>{user === null ? loginForm() : blogView()}</div>
}

export default App
