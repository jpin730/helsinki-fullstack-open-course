import { useField } from '../hooks/useField'

export const CreateNew = ({ onCreate }) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreate({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <main>
      <h2>Create a new anecdote</h2>

      <form onSubmit={handleSubmit} onReset={handleReset}>
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
          <button type="submit">Create</button>
          <button type="reset">Reset</button>
        </p>
      </form>
    </main>
  )
}
