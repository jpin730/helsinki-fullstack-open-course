import { useState } from 'react'
import { Filter } from './components/filter'

const INITIAL_PERSONS = {
  ['Arto Hellas']: { name: 'Arto Hellas', number: '040-123456' },
  ['Ada Lovelace']: { name: 'Ada Lovelace', number: '39-44-5323523' },
  ['Dan Abramov']: { name: 'Dan Abramov', number: '12-43-234345' },
  ['Mary Poppendieck']: { name: 'Mary Poppendieck', number: '39-23-6423122' },
}

const App = () => {
  const [persons, setPersons] = useState(INITIAL_PERSONS)
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const filteredPersons = Object.values(persons).filter((person) =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase()),
  )

  const onChangeFilter = (value) => setFilter(value)

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
      <h1>Phone Book</h1>
      <Filter filter={filter} onChange={onChangeFilter} />

      <hr />
      <h2>Add a New</h2>
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
      <hr />
      <h2>Numbers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersons.map((person) => (
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
