import { useState } from 'react'

export const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    onCreate({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            Title
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            URL
            <input type="url" value={url} onChange={({ target }) => setUrl(target.value)} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}
