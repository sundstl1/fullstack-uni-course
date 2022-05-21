import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const BlogForm = (props) => {
  const handleNewBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    props.createBlog(newBlog)
    props.setNotification(`you added blog ${newBlog.title}`, 5)

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input type="text" name="title" id="blog-title" />
        </div>
        <div>
          author:
          <input type="text" name="author" id="blog-author" />
        </div>
        <div>
          url:
          <input type="text" name="url" id="blog-url" />
        </div>
        <button type="submit" id="create-blog-button">
          create
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  createBlog,
  setNotification,
}

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(BlogForm)

export default ConnectedForm
