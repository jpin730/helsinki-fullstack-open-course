import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNotification } from '../hooks/useNotification'
import { useTogglable } from '../hooks/useTogglable'
import { createBlog } from '../reducers/blogReducer'

export const BlogForm = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.logged)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { notify, notifyError } = useNotification()

  const togglable = useTogglable()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const blog = await dispatch(createBlog({ title, author, url }, user.token))
      reset()
      togglable.toggleVisibility()
      notify(`Blog "${blog.title}" created successfully`)
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Creating blog failed')
    }
  }

  const reset = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

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
