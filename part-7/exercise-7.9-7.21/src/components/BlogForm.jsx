import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { useDispatch, useSelector } from 'react-redux'

import { NotificationContext } from '../contexts/NotificationContext'
import { useTogglable } from '../hooks/useTogglable'
import { createBlog } from '../reducers/blogReducer'

export const BlogForm = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.logged)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { notify, notifyError } = useContext(NotificationContext)

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
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          Title
          <Form.Control
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Author
          <Form.Control
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          URL
          <Form.Control type="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </Form.Label>
      </Form.Group>
      <Stack direction="horizontal" gap={2}>
        <Button type="submit">Create</Button>
        {togglable.cancelButton}
      </Stack>
    </Form>
  )
}
