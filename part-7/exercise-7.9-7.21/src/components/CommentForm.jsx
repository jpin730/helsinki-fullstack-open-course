import { useState } from 'react'
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
    <>
      <h2>Add a comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Comment
            <textarea
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            ></textarea>
          </label>
        </div>
        <button type="submit">Add Comment</button>
      </form>
    </>
  )
}
