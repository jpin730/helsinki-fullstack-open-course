import { useEffect, useState } from 'react'
import countriesService from '../services/countries'

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const capital = country.capital[0]
  const openWeatherIconBaseUrl = 'https://openweathermap.org/payload/api/media/file'

  useEffect(() => {
    const abortController = new AbortController()
    countriesService
      .getWeatherByCapital(capital, abortController.signal)
      .then((data) => setWeather(data))

    return () => abortController.abort()
  }, [capital])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
      {weather && (
        <>
          <h3>Weather in {capital}</h3>
          <p>Temperature {weather.main.temp} °C</p>
          <img
            src={`${openWeatherIconBaseUrl}/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  )
}

export default CountryDetail
