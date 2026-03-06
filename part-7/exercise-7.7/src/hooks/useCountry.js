import { useEffect, useState } from 'react'

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const numberFormatter = new Intl.NumberFormat('en-US', { notation: 'standard', useGrouping: true })
const formatNumber = (num) => numberFormatter.format(num)

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    const fetchCountry = async () => {
      try {
        const encodedName = encodeURIComponent(name.toLowerCase())
        const response = await fetch(`${BASE_URL}/name/${encodedName}`)

        if (!response.ok) {
          throw new Error('Response not ok')
        }

        const data = await response.json()
        setCountry({
          found: true,
          data: {
            name: data.name.common,
            capital: data.capital ? data.capital[0] : 'N/A',
            population: formatNumber(data.population),
            flag: data.flags.png,
          },
        })
      } catch (error) {
        setCountry({ found: false })
      }
    }

    fetchCountry()
  }, [name])

  return country
}
