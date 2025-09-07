import { useState } from 'react'
import { Filter } from './components/filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { INITIAL_PERSONS } from './consts/initial-persons'
import { filterPersons } from './utils/filter-persons'

const App = () => {
  const [persons, setPersons] = useState(INITIAL_PERSONS)
  const [filter, setFilter] = useState('')

  const filteredPersons = filterPersons(persons, filter)

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
