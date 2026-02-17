import { useEffect, useRef, useState } from 'react'
import { Filter } from './components/filter'
import { Notification } from './components/Notification'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { ERROR_MESSAGE_PREFIX } from './consts/error-message-prefix'
import { MESSAGE_TIMEOUT } from './consts/message-timeout'
import personsService from './services/persons'
import { filterPersons } from './utils/filter-persons'

const App = () => {
  const [persons, setPersons] = useState({})
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    personsService.getAll().then((data) => {
      const personsByName = data.reduce((acc, person) => {
        acc[person.name] = person
        return acc
      }, {})
      setPersons(personsByName)
    })
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const filteredPersons = filterPersons(persons, filter)

  const onChangeFilter = (value) => setFilter(value)

  const clearMessage = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setMessage(null)
      timeoutRef.current = null
    }, MESSAGE_TIMEOUT)
  }

  const updatePerson = async ({ id, name, number }) => {
    const confirmMessage = `${name} is already added to phone book, replace the old number with a new one?`
    const confirmed = confirm(confirmMessage)
    if (!confirmed) return false

    try {
      const updatedPerson = await personsService.update(id, { name, number })
      setPersons({ ...persons, [updatedPerson.name]: updatedPerson })
      setMessage(`Updated ${updatedPerson.name}'s number`)
      clearMessage()
      return true
    } catch (error) {
      setMessage(`${ERROR_MESSAGE_PREFIX}${error.response.data?.error ?? error.message}`)
      clearMessage()
      return false
    }
  }

  const addPerson = async ({ name, number }) => {
    const foundPerson = persons[name]

    if (foundPerson) {
      return updatePerson({ ...foundPerson, number })
    }

    try {
      const newPerson = await personsService.create({ name, number })
      setPersons({ ...persons, [newPerson.name]: newPerson })
      setMessage(`Added ${newPerson.name}`)
      clearMessage()
      return true
    } catch (error) {
      setMessage(`${ERROR_MESSAGE_PREFIX}${error.response.data?.error ?? error.message}`)
      clearMessage()
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

      <Notification message={message} />

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
