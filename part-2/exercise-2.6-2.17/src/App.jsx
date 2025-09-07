import { useState } from 'react'
import { Filter } from './components/filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'

const INITIAL_PERSONS = {
  ['Arto Hellas']: { name: 'Arto Hellas', number: '040-123456' },
  ['Ada Lovelace']: { name: 'Ada Lovelace', number: '39-44-5323523' },
  ['Dan Abramov']: { name: 'Dan Abramov', number: '12-43-234345' },
  ['Mary Poppendieck']: { name: 'Mary Poppendieck', number: '39-23-6423122' },
}

const App = () => {
  const [persons, setPersons] = useState(INITIAL_PERSONS)
  const [filter, setFilter] = useState('')

  const filteredPersons = Object.values(persons).filter(({ name }) =>
    name.toLowerCase().includes(filter.trim().toLowerCase()),
  )

  const onChangeFilter = (value) => setFilter(value)

  const addPerson = ({ name, number }) => {
    const nameExists = name in persons

    if (nameExists) {
      alert(`${name} is already added to phone book`)
      return false
    }

    setPersons({ ...persons, [name]: { name, number } })
    return true
  }

  return (
    <div>
      <h1>Phone Book</h1>
      <Filter onChange={onChangeFilter} />

      <hr />
      <h2>Add a New</h2>
      <PersonForm onSubmit={addPerson} />

      <hr />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
