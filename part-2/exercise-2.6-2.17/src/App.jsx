import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState({ ['Arto Hellas']: 'Arto Hellas' })
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedName = newName.trim()

    if (trimmedName === '') return

    const nameExists = trimmedName in persons

    if (nameExists) {
      alert(`${trimmedName} is already added to phone book`)
      return
    }

    const nameObject = { [trimmedName]: trimmedName }
    setPersons({ ...persons, ...nameObject })
    setNewName('')
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" value={newName} onChange={({ target }) => setNewName(target.value)} />

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
