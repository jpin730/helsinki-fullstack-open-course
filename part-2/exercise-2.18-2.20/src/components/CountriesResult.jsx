import CountryDetail from './CountryDetail'

const CountriesResult = ({ countries, onSelect }) => {
  if (!countries || countries.length === 0) {
    return null
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    const country = countries[0]
    return <CountryDetail country={country} />
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common} &nbsp;
          <button onClick={() => onSelect(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountriesResult
