import { useState } from 'react'

import blogService from '../services/blogs'

export const BlogEditor = ({ onCreate, onMessage, token }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({ title, author, url }, token)
      onCreate(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
      onMessage(`Blog "${blog.title}" created successfully`)
    } catch (error) {
      onMessage(error.response?.data?.error ?? 'Creating blog failed', true)
    }
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
