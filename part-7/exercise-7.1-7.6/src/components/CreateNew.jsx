import { useField } from '../hooks/useField'

export const CreateNew = ({ onCreate }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreate({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  return (
    <main>
      <h2>Create a new anecdote</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Content
            <input name="content" {...content} />
          </label>
        </div>

        <div>
          <label>
            Author
            <input name="author" {...author} />
          </label>
        </div>

        <div>
          <label>
            URL for more info
            <input name="info" {...info} />
          </label>
        </div>

        <p>
          <button>Create</button>
        </p>
      </form>
    </main>
  )
}
