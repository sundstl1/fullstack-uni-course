import React from "react";
import Contact from "./Contact";

const ContactList = ({contacts, deleteContact}) => {
    return (
        <>
        {contacts.map(contact =>
            <Contact
                key={contact.id}
                contact={contact}
                deleteContact={() => deleteContact(contact.id, contact.name)}
            />)}
        </>
    )
}

export default ContactList
