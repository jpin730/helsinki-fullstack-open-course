import { useField } from './hooks/useField'
import { useResource } from './hooks/useResource'

export const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <main>
      <h2>Notes</h2>

      <form onSubmit={handleNoteSubmit}>
        <div>
          <label>
            Content
            <input {...content} />
          </label>
        </div>
        <div>
          <button>Create</button>
        </div>
      </form>

      <ul>
        {notes.map((n) => (
          <li key={n.id}>{n.content}</li>
        ))}
      </ul>

      <hr />

      <h2>Persons</h2>

      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>Create</button>
      </form>

      <ul>
        {persons.map((n) => (
          <li key={n.id}>
            {n.name} {n.number}
          </li>
        ))}
      </ul>
    </main>
  )
}
