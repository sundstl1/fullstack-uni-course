import React from "react";
import FormField from "./FormField";

const FilterForm = ({onSubmit, inputValue, onChange}) => (
    <form onSubmit={onSubmit}>
    <FormField
      description="filter shown with"
      inputValue={inputValue}
      onChange={onChange}
    />
  </form>
  )
  
  export default FilterForm