import { useState } from 'react'

export const PersonForm = ({ onSubmit }) => {
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

    onSubmit({ name: trimmedName, number: trimmedNumber }).then((success) => {
      if (success) {
        setNewName('')
        setNewNumber('')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" value={newName} onChange={({ target }) => setNewName(target.value)} />

      <label htmlFor="number">Number</label>
      <input id="number" value={newNumber} onChange={({ target }) => setNewNumber(target.value)} />

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
