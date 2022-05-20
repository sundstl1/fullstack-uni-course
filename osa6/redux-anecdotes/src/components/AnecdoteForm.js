import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const newAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`you added anecdote ${content}`, 5)
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
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
      createAnecdote,
      setNotification,
    }
  
  const ConnectedForm= connect(
    mapStateToProps,
    mapDispatchToProps)(AnecdoteForm)


export default ConnectedForm
