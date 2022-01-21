import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.count}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
        <Part part={props.part1} count={props.count1} />
        <Part part={props.part2} count={props.count2} />
        <Part part={props.part3} count={props.count3} />
    </div>
  )
}


const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.num1 + props.num1 + props.num1}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} count1={part1.exercises} part2={part2.name} count2={part2.exercises} part3={part3.name} count3={part3.exercises} />
      <Total num1={part1.exercises} num2={part2.exercises} num3={part3.exercises} />
    </div>
  )
}

export default App