import { useImperativeHandle, useState } from 'react'

export const BlogForm = ({ ref, onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    onCreate({ title, author, url })
  }

  const reset = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useImperativeHandle(ref, () => {
    return { reset }
  })

  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
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
