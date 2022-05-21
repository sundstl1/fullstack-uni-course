import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import Notification from './components/notification'
import Togglable from './components/toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(updateBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification('Logged in!'), 5)
    } catch (exception) {
      dispatch(setNotification('wrong credentials'), 5)
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(user.token)
      setUser(null)
      setUsername('')
      setPassword('')
      dispatch(setNotification('Successfully logged out', 5))
    } catch (exception) {
      dispatch(setNotification('failed to log out', 5))
    }
  }

  const updateBlog = async (blog) => {
    try {
      const blogToUpdate = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      }
      await blogService.update(blogToUpdate, blog.id)
      await updateBlogs()
      console.log('updating!')
      dispatch(setNotification(`blog updated!`, 5))
    } catch (exception) {
      dispatch(setNotification('failed to update blog!', 5))
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title}?`)) {
        await blogService.remove(blog.id)
        await updateBlogs()
        dispatch(setNotification('blog deleted!', 5))
      }
    } catch (exception) {
      dispatch(setNotification('failed to delete blog!', 5))
    }
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification className="userMessage" />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
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
