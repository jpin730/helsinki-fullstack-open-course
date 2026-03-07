import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'
import { initializeBlogs } from './reducers/blogReducer'
import { useUser } from './reducers/useUser'

export const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const blogFormTogglableRef = useRef()

  const { user, login, logout } = useUser()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const onCreateBlog = () => blogFormTogglableRef.current.toggleVisibility()

  return (
    <>
      <h1>Blogs</h1>

      <Notification />

      {!user && (
        <Togglable label="Login">
          <LoginForm login={login} />
        </Togglable>
      )}

      {user && (
        <>
          <p>
            <b>{user.name}</b> logged in
          </p>

          <p>
            <button onClick={logout}>Logout</button>
          </p>

          <Togglable label="Create new blog" ref={blogFormTogglableRef}>
            <BlogForm onCreate={onCreateBlog} />
          </Togglable>
        </>
      )}

      <hr />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}
