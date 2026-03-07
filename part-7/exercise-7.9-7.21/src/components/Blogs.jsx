import { useEffect } from 'react'
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
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={getTo(blog)}>
            "{blog.title}" by {blog.author}
          </Link>
        </li>
      ))}
    </ul>
  )
}
