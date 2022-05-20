import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortByVotes = (array) => {
  return array.sort((a,b) => b.votes - a.votes)
}

const initialState = sortByVotes(anecdotesAtStart.map(asObject))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload
      state.push(content)
      sortByVotes(state)
    },
    setAnecdotes(state, action){
      return sortByVotes(action.payload)
    },
    voteOn(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnectdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }
      return sortByVotes(state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnectdote 
      ))
    }
  },
})

export const { addAnecdote, setAnecdotes, voteOn } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
}}

export const createAnecdote = content => {
  return async dispatch => {
    console.log(`creating anecdote ${content}`)
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
}}

export const updateAnecdote = (content, id, votes) => {
  return async dispatch => {
    console.log(`updating anecdote ${content} ${votes}`)
    const newAnecdote = await anecdoteService.update({
      id: id,
      content: content,
      votes: votes
    })
    dispatch(voteOn(newAnecdote.id))
  }}

  

