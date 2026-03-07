import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNotification } from '../hooks/useNotification'
import { deleteBlogById, likeBlog } from '../reducers/blogReducer'

export const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const [isExpanded, setIsExpanded] = useState(false)

  const { notify, notifyError } = useNotification()

  const isOwner = blog.user?.username === user?.username

  const toggleButtonLabel = isExpanded ? 'hide' : 'view'
  const toggleExpanded = () => setIsExpanded(!isExpanded)

  const handleLike = (blog) => async () => {
    try {
      const { title } = await dispatch(likeBlog(blog))
      notify(`You liked "${title}"`)
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Liking blog failed')
    }
  }

  const handleDelete =
    ({ id, title, author }) =>
    async () => {
      if (!confirm(`Remove blog "${title}" by ${author || 'UNKNOWN'}?`)) {
        return
      }

      try {
        await dispatch(deleteBlogById(id, user.token))
        notify(`Blog "${title}" deleted successfully`)
      } catch (error) {
        notifyError(error.response?.data?.error ?? 'Deleting blog failed')
      }
    }

  return (
    <article
      style={{
        padding: '0 1rem',
        border: 'solid',
        borderWidth: 2,
        marginBottom: '1rem',
        borderRadius: '0.5rem',
      }}
    >
      <h3>
        {blog.title} {blog.author} &nbsp;
        <button onClick={toggleExpanded}>{toggleButtonLabel}</button>
      </h3>
      {isExpanded && (
        <>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes &nbsp;
            <button onClick={handleLike(blog)}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {isOwner && (
            <p>
              <button onClick={handleDelete(blog)}>remove</button>
            </p>
          )}
        </>
      )}
    </article>
  )
}
