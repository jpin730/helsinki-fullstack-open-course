import { useState } from 'react'

import { Country } from './components/Country'
import { useCountry } from './hooks/useCountry'
import { useField } from './hooks/useField'

export const App = () => {
  const [name, setName] = useState('')

  const nameInput = useField('text')

  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value.trim())
  }

  return (
    <main>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <hr />

      <Country country={country} />
    </main>
  )
}
