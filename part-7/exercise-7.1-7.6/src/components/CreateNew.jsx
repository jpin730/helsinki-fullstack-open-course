import { useState } from 'react'

export const CreateNew = ({ onCreate }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreate({
      content,
      author,
      info,
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
            <input name="content" value={content} onChange={(e) => setContent(e.target.value)} />
          </label>
        </div>

        <div>
          <label>
            Author
            <input name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </label>
        </div>

        <div>
          <label>
            URL for more info
            <input name="info" value={info} onChange={(e) => setInfo(e.target.value)} />
          </label>
        </div>

        <p>
          <button>Create</button>
        </p>
      </form>
    </main>
  )
}
