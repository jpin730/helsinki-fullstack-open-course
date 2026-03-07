import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'
import { createBlog, deleteBlogById, initializeBlogs, likeBlog } from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'
import { login, logout, setUser } from './reducers/userReducer'

const LOGGED_USER_KEY = 'loggedBlogAppUser'

export const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormTogglableRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(
    function restoreUserSession() {
      const storedUser = localStorage.getItem(LOGGED_USER_KEY)
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)))
      }
    },
    [dispatch],
  )

  useEffect(
    function syncUserToStorage() {
      if (user) {
        localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user))
        return
      }

      localStorage.removeItem(LOGGED_USER_KEY)
    },
    [user],
  )

  const notify = (message, isError = false) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch(showNotification(message, isError))
  }

  const notifyError = (message) => notify(message, true)

  const handleLogin = async ({ username, password }) => {
    try {
      await dispatch(login({ username, password }))
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Login failed')
    }
  }

  const handleLogout = () => dispatch(logout())

  const handleCreateBlog = async ({ title, author, url }) => {
    try {
      const blog = await dispatch(createBlog({ title, author, url }, user.token))
      blogFormTogglableRef.current.toggleVisibility()
      blogFormRef.current.reset()
      notify(`Blog "${blog.title}" created successfully`)
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Creating blog failed')
    }
  }

  const handleLikeBlog =
    ({ id, user, likes, author, title, url }) =>
    async () => {
      try {
        const blog = await dispatch(likeBlog({ id, user, likes, author, title, url }))
        notify(`You liked "${blog.title}"`)
      } catch (error) {
        notifyError(error.response?.data?.error ?? 'Liking blog failed')
      }
    }

  const handleDeleteBlog =
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
    <>
      <h1>Blogs</h1>

      <Notification />

      {!user && (
        <Togglable label="Login">
          <LoginForm onLogin={handleLogin} />
        </Togglable>
      )}

      {user && (
        <>
          <p>
            <b>{user.name}</b> logged in
          </p>

          <p>
            <button onClick={handleLogout}>Logout</button>
          </p>

          <Togglable label="Create new blog" ref={blogFormTogglableRef}>
            <BlogForm onCreate={handleCreateBlog} ref={blogFormRef} />
          </Togglable>
        </>
      )}

      <hr />

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          isOwner={blog.user?.username === user?.username}
          onLike={handleLikeBlog(blog)}
          onDelete={handleDeleteBlog(blog)}
        />
      ))}
    </>
  )
}
