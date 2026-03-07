import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
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
        <Button variant="light" onClick={handleLike(blog)}>
          Like
        </Button>
      </p>

      <p>{blog.user.name}</p>
      {isOwner && (
        <p>
          <Button variant="danger" onClick={handleDelete(blog)}>
            Remove
          </Button>
        </p>
      )}

      <hr />

      {blog.comments?.length > 0 && (
        <Card className="mb-3">
          <Card.Header>Comments</Card.Header>
          <ListGroup variant="flush">
            {blog.comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}

      <Togglable label="Add a comment">
        <CommentForm id={blog.id} />
      </Togglable>
    </>
  )
}
