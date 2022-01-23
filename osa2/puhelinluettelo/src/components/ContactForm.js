import React from "react";
import FormField from "./FormField";

const ContactForm = (props) => (
  <form onSubmit={props.onSubmit}>
    <FormField
      description="name:"
      inputValue={props.nameInputValue}
      onChange={props.nameOnChange}
    />
    <FormField
      description="number:"
      inputValue={props.numberInputValue}
      onChange={props.numberOnChange}
    />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default ContactForm