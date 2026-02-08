import { useEffect, useState } from 'react'
import CountriesResult from './components/CountriesResult'
import SearchInput from './components/SearchInput'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesService.getAll().then((data) => setCountries(data))
  }, [])

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredCountries([])
      return
    }

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCountries(filtered)
  }

  const handleCountrySelect = (country) => {
    setFilteredCountries([country])
  }

  return (
    <main>
      <h1>Rest Countries</h1>

      <p>
        <label htmlFor="search">
          Find countries
          <SearchInput id="search" onSearch={handleSearch} />
        </label>
      </p>

      <p>{filteredCountries.length}</p>

      <CountriesResult countries={filteredCountries} onSelect={handleCountrySelect} />
    </main>
  )
}

export default App
