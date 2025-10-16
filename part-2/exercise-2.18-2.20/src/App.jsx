import { useEffect, useRef, useState } from 'react'
import CountriesResult from './components/CountriesResult'
import SearchInput from './components/SearchInput'
import countriesService from './services/countries'

const App = () => {
  const countriesRef = useRef([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesService.getAll().then((data) => (countriesRef.current = data))
  }, [])

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredCountries([])
      return
    }

    const filtered = countriesRef.current.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCountries(filtered)
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

      <CountriesResult countries={filteredCountries} />
    </main>
  )
}

export default App
