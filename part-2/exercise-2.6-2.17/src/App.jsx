import { useState } from 'react'

const INITIAL_PERSONS = {
  ['Arto Hellas']: { name: 'Arto Hellas', number: '000-000-0000' },
}

const App = () => {
  const [persons, setPersons] = useState(INITIAL_PERSONS)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    if (trimmedName === '' || trimmedNumber === '') {
      alert('Both name and number are required')
      return
    }

    const nameExists = trimmedName in persons

    if (nameExists) {
      alert(`${trimmedName} is already added to phone book`)
      return
    }

    const nameObject = { [trimmedName]: { name: trimmedName, number: trimmedNumber } }
    setPersons({ ...persons, ...nameObject })
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" value={newName} onChange={({ target }) => setNewName(target.value)} />

        <label htmlFor="number">Number</label>
        <input
          id="number"
          value={newNumber}
          onChange={({ target }) => setNewNumber(target.value)}
        />

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App
