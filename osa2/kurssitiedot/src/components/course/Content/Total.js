import React from "react";

const Total = ({parts}) => {
  const exercisesArray = parts.map(part => part.exercises)
  const sum = parts.reduce((total,part) => total = total + part.exercises, 0)
    return (
      <>
        <p>
          <b>
            Number of exercises {sum}
          </b>  
        </p>
      </>
    )
  }

  export default Total