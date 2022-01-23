import React from "react";
import Contact from "./Contact";

const ContactList = ({contacts}) => {
    return (
        <>
        {contacts.map(contact =>
            <Contact
                key={contact.name}
                contact={contact}
            />)}
        </>
    )
}

export default ContactList
