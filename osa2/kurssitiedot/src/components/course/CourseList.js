import React from "react";
import Course from "./course";

const CourseList = ({courses}) => {
    return (
      <>
        {courses.map(course => <Course key={course.id} course={course} />)}
      </>
    )
  }

export default CourseList