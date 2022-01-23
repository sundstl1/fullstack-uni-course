import React, { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'
import contactService from './services/contacts'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState('')
  const[errorMessage, setErrorMessage] = useState('some error happened...')
  const[successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
        .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const contactsToShow = persons.filter(p =>
    p.name
      .toLocaleLowerCase()
      .includes(Filter)
  )

  const addContact = (event) => {
    event.preventDefault()
    
    if (persons.map(p => p.name).includes(newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
        updateContact(newName, newNumber)
      }
      setNewName('')
      setNewNumber('')
    }
    else {
      const contactObject = {
        name: newName,
        number: newNumber
      }
      contactService
      .create(contactObject)
        .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        showUserMessage(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const IgnoreOnSubmit = (event) => {
    event.preventDefault()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)){
      contactService
      .deleteObject(id)
      .then( p=> {
        setPersons(persons.filter(p => p.id !== id))
        showUserMessage(`Deleted ${name}`)
      }
      )
      .catch(error => {
        showErrorMessage(
          `Information of '${name}' has already been removed from server`
        )
        setPersons(persons.filter(p => p.name !== name))
      })
      
    }
  }

  const updateContact = (name, newNumber) => {
    const oldContact = persons.find(p => p.name === name)
    const changedContact = { ...oldContact, number: newNumber }

    contactService
      .update(oldContact.id, changedContact)
        .then(returnedContact => {
        setPersons(persons.map(p => p.id !== oldContact.id ? p : returnedContact))
        showUserMessage(`Updated ${name}`)
      })
      .catch(error => {
        showErrorMessage(
          `Information of '${name}' has already been removed from server`
        )
        setPersons(persons.filter(p => p.name !== name))
      })
  }

  const showUserMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const showErrorMessage = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} className="userMessage" />
      <Notification message={errorMessage} className="error" />
      <FilterForm
        inputValue={Filter}
        onChange={handleFilterChange}
        onSubmit={IgnoreOnSubmit}
      />
      <h2>Add a new</h2>
      <ContactForm
        onSubmit={addContact}
        nameInputValue={newName}
        nameOnChange={handleNameChange}
        numberInputValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ContactList contacts={contactsToShow} deleteContact={deleteContact} updateContact={updateContact} />
    </div>
  )

}

export default App