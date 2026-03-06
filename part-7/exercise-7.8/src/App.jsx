import { useField } from './hooks/useField'
import { useResource } from './hooks/useResource'

export const App = () => {
  const { reset: contentReset, ...content } = useField('text')
  const { reset: nameReset, ...name } = useField('text')
  const { reset: numberReset, ...number } = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    await noteService.create({ content: content.value })
    contentReset()
  }

  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    await personService.create({ name: name.value, number: number.value })
    nameReset()
    numberReset()
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
