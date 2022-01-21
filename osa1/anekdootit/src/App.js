import React, { useState } from 'react'

const Title = ({title}) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const DisplayVotes = props => <div>has {props.votes} votes</div>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const UpdateTable = () => {
    console.log(votes)
    const copy = [...votes]
    copy[selected] += 1
    return copy
  }

  const FindMaxIndex = () => {
    let bestIndex = 0
    let mostVotes = 0
    votes.forEach((vote, index) => {
      if (vote > mostVotes){
        bestIndex = index
        mostVotes = vote
      }
    });
    return bestIndex
  }

  console.log(votes)
  return (
    <div>
      <Title title="Anecdote of the day" />
      {anecdotes[selected]}<br/>
      <DisplayVotes votes={votes[selected]} />
      <Button text="vote" handleClick={() => setVotes(UpdateTable(votes, selected))}/>
      <Button text="next anecdote" handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}/>
      <Title title="Anecdote with most votes" />
      {anecdotes[FindMaxIndex()]}
      <DisplayVotes votes={votes[FindMaxIndex()]} />
    </div>
  )
}

export default App