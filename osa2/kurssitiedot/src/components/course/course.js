import React from "react"
import Header from "./Header"
import Content from "./Content/Content"

const Course = ({course}) => {
    return (
      <>
            <Header course={course.name} />
            <Content parts={course.parts} />
      </>
    )
  }

  export default Course