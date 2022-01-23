import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import CountryViewer from './components/CountryViewer'

const App = () => {
  const [Filter, setFilter] = useState('')
  const [Countries, setCountries] = useState([])
  const filteredCountries = Countries.filter(c => c.name.toLowerCase().includes(Filter.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const IgnoreOnSubmit = (event) => {
    event.preventDefault()
  }

  const showCountry = (country) =>{
    setFilter(country.name)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <FilterForm
        inputValue={Filter}
        onChange={handleFilterChange}
        onSubmit={IgnoreOnSubmit}
      />
      <CountryViewer countries={filteredCountries} showCountry={showCountry} />
    </div>
  )

}

export default App