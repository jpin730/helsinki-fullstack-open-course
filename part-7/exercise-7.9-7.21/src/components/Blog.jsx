import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'

import { Path } from '../consts/Path'
import { useNotification } from '../hooks/useNotification'
import {
  clearCurrentBlog,
  deleteBlogById,
  initializeBlogById,
  likeBlog,
} from '../reducers/blogReducer'
import { CommentForm } from './CommentForm'
import { Togglable } from './Toggable'

export const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = useSelector((state) => state.blogs.current)
  const user = useSelector((state) => state.user.logged)

  const { id } = useParams()

  const { notify, notifyError } = useNotification()

  useEffect(() => {
    dispatch(initializeBlogById(id))

    return () => {
      dispatch(clearCurrentBlog())
    }
  }, [dispatch, id])

  if (blog == null) {
    return null
  }

  const isOwner = blog.user?.username === user?.username

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
        navigate(Path.Blogs)
      } catch (error) {
        notifyError(error.response?.data?.error ?? 'Deleting blog failed')
      }
    }

  return (
    <>
      <h2>
        "{blog.title}" by {blog.author}
      </h2>

      <p>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>

      <p>
        {blog.likes} likes &nbsp;
        <button onClick={handleLike(blog)}>like</button>
      </p>

      <p>{blog.user.name}</p>
      {isOwner && (
        <p>
          <button onClick={handleDelete(blog)}>remove</button>
        </p>
      )}

      <hr />

      <h3>Comments</h3>

      <ul>
        {blog.comments?.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      <Togglable label="Add a comment">
        <CommentForm id={blog.id} />
      </Togglable>
    </>
  )
}
