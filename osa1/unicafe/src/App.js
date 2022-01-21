import React, { useState } from 'react'

const Title = ({title}) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

const StatisticLine = props => <tr><td>{props.name} {props.value} {props.unit}</td></tr>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {  
  const count = good + neutral + bad

  if (count === 0){
    return (
      <div>
        <p>No Feedback given</p>
      </div>
    )
  }

  const value = good - bad
  const average = value / count
  const positive = good / count

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="all" value={count} />
          <StatisticLine name="average" value={average} />
          <StatisticLine name="positive" value={positive * 100} unit='%' />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title="give feedback" />
      <Button handleClick={() => setGood(good +1)} text="good" />
      <Button handleClick={() => setNeutral(neutral +1)} text="neutral" />
      <Button handleClick={() => setBad(bad +1)} text="bad" />
      <Title title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App