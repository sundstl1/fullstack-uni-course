import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const allAnecdotes = useSelector(state => state.anecdotes)
    const filterString = useSelector(state => state.filter)
    const anecdotes = allAnecdotes.filter(a => a.content.includes(filterString))
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      dispatch(updateAnecdote(anecdote.content, anecdote.id, anecdote.votes +1))
      dispatch(setNotification(`you voted ${anecdote.content}`, 5))
      
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </div>
    )
}

export default AnecdoteList