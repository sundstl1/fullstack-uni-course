import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import FilterForm from './components/FilterForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const contactObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(contactObject))
    }
    
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <ContactList contacts={contactsToShow} />
    </div>
  )

}

export default App