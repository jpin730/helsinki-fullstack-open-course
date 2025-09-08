import { useEffect, useState } from 'react'
import { Filter } from './components/filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import personsService from './services/persons'
import { filterPersons } from './utils/filter-persons'

const App = () => {
  const [persons, setPersons] = useState({})
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll().then((data) => {
      const personsByName = data.reduce((acc, person) => {
        acc[person.name] = person
        return acc
      }, {})
      setPersons(personsByName)
    })
  }, [])

  const filteredPersons = filterPersons(persons, filter)

  const onChangeFilter = (value) => setFilter(value)

  const addPerson = async ({ name, number }) => {
    const nameExists = name in persons

    if (nameExists) {
      alert(`${name} is already added to phone book`)
      return false
    }

    try {
      const newPerson = await personsService.create({ name, number })
      setPersons({ ...persons, [newPerson.name]: newPerson })
      return true
    } catch (error) {
      console.error('Error adding person:', error)
      return false
    }
  }

  const deletePerson = (id) => {
    personsService
      .remove(id)
      .then((removedPerson) => {
        const updatedPersons = structuredClone(persons)
        delete updatedPersons[removedPerson.name]
        setPersons(updatedPersons)
      })
      .catch((error) => {
        console.error('Error deleting person:', error)
      })
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
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
