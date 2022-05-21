import { useState } from 'react'
import { voteBlog, removeBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = (props) => {
  const [showFull, setShowFull] = useState(false)
  const blog = props.blog
  const username = props.username

  const toggleFullInfo = () => {
    setShowFull(!showFull)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const shortBlog = () => (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleFullInfo} data-testid="infoButton" id="infoButton">
        view
      </button>
    </div>
  )

  const longBlog = () => {
    return (
      <div style={blogStyle} className="blog">
        {blog.title}
        <button
          onClick={toggleFullInfo}
          data-testid="infoButton"
          id="infoButton"
        >
          hide
        </button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={handleLike} data-testid="likeButton" id="likeButton">
          like
        </button>
        <br />
        {blog.author}
        <br />
        {blog.user.username === username ? (
          <button onClick={handleDelete} id="removeButton">
            remove
          </button>
        ) : (
          void 0
        )}
      </div>
    )
  }

  const handleLike = () => {
    props.voteBlog(blog, blog.id)
  }

  const handleDelete = () => {
    props.removeBlog(blog.id)
  }

  return showFull ? longBlog(blog) : shortBlog(blog)
}

const mapDispatchToProps = {
  voteBlog,
  removeBlog,
}

const ConnectedForm = connect(null, mapDispatchToProps)(Blog)

export default ConnectedForm
