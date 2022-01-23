import React from "react";

const FormField = ({description, inputValue, onChange}) => (
    <div>
        {description} <input
          value={inputValue}
          onChange={onChange}
        />
      </div>
)

export default FormField