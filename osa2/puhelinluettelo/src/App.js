import React, { useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import FilterForm from './components/FilterForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filter, setFilter] = useState('')

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