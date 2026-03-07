import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from '../reducers/blogReducer'
import { Blog } from './Blog'

export const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
}
