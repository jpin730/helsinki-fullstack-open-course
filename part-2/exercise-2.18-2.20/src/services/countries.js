const restCountriesBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const openWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5'
const openWeatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const getAll = () => {
  const url = new URL(`${restCountriesBaseUrl}/all`)
  return fetch(url).then((response) => response.json())
}

const getWeatherByCapital = (capital, signal) => {
  const url = new URL(`${openWeatherBaseUrl}/weather`)
  url.searchParams.append('q', capital)
  url.searchParams.append('appid', openWeatherApiKey)
  url.searchParams.append('units', 'metric')
  return fetch(url, { signal }).then((response) => response.json())
}

export default { getAll, getWeatherByCapital }
