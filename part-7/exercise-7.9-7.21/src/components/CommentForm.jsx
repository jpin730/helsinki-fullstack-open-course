import { useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { useNotification } from '../hooks/useNotification'
import { useTogglable } from '../hooks/useTogglable'
import { addCommentToBlog } from '../reducers/blogReducer'

export const CommentForm = ({ id }) => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const { notify, notifyError } = useNotification()

  const togglable = useTogglable()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const updatedBlog = await dispatch(addCommentToBlog(id, comment))
      reset()
      togglable.toggleVisibility()
      notify(`Comment added to blog "${updatedBlog.title}" successfully`)
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Adding comment failed')
    }
  }

  const reset = () => {
    setComment('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          Comment
          <Form.Control
            as="textarea"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Stack direction="horizontal" gap={2}>
        <Button variant="secondary" type="submit">
          Comment
        </Button>
        {togglable.cancelButton}
      </Stack>
    </Form>
  )
}
