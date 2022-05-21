import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/blogForm";
import Notification from "./components/notification";
import Togglable from "./components/toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    updateBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const updateBlogs = async () => {
    const blogs = await blogService.getAll();
    console.log(blogs);
    blogs.sort((a, b) => b.likes - a.likes);
    console.log(blogs);
    setBlogs(blogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      showUserMessage("Logged in!");
    } catch (exception) {
      showErrorMessage("wrong credentials");
    } finally {
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedNoteappUser");
      blogService.setToken(user.token);
      setUser(null);
      setUsername("");
      setPassword("");
      showUserMessage("Successfully logged out");
    } catch (exception) {
      showErrorMessage("failed to log out");
    }
  };

  const showUserMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const createBlog = async (blog) => {
    try {
      await blogService.create(blog);
      await updateBlogs();
      showUserMessage("Created new blog!");
    } catch (exception) {
      showErrorMessage("failed to save blog!");
    }
  };

  const updateBlog = async (blog) => {
    try {
      const blogToUpdate = {
        user: blog.user.id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };
      await blogService.update(blogToUpdate, blog.id);
      await updateBlogs();
      showUserMessage("blog updated!");
    } catch (exception) {
      showErrorMessage("failed to update blog!");
    }
  };

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title}?`)) {
        await blogService.remove(blog.id);
        await updateBlogs();
        showUserMessage("blog deleted!");
      }
    } catch (exception) {
      showErrorMessage("failed to delete blog!");
    }
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={successMessage} className="userMessage" />
      <Notification message={errorMessage} className="error" />
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
  );
  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} className="userMessage" />
      <Notification message={errorMessage} className="error" />
      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          username={user.username}
        />
      ))}
    </div>
  );

  return <div>{user === null ? loginForm() : blogView()}</div>;
};

export default App;
