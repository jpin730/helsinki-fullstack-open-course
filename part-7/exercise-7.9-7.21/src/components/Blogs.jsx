import { useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'

import { Path } from '../consts/Path'
import { initializeBlogs } from '../reducers/blogReducer'

export const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs.list)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const getTo = (blog) => Path.BlogById.replace(':id', blog.id)

  return (
    <>
      <h2>Blogs</h2>

      <ListGroup>
        {blogs.map((blog) => (
          <ListGroup.Item action as={Link} to={getTo(blog)} key={blog.id}>
            "{blog.title}" by {blog.author}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}
