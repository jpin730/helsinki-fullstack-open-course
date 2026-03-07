import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'
import { initializeBlogs } from './reducers/blogReducer'
import { showNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const LOGGED_USER_KEY = 'loggedBlogAppUser'

export const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const [user, setUser] = useState(null)

  const blogFormTogglableRef = useRef()
  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(function restoreUserSession() {
    const storedUser = localStorage.getItem(LOGGED_USER_KEY)
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

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

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      loginFormRef.current.reset()
      setUser(user)
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Login failed')
    }
  }

  const logout = () => setUser(null)

  const createBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create({ title, author, url }, user.token)
      blogFormTogglableRef.current.toggleVisibility()
      blogFormRef.current.reset()
      notify(`Blog "${blog.title}" created successfully`)
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Creating blog failed')
    }
  }

  const likeBlog = async ({ id, user, likes, author, title, url }) => {
    try {
      await blogService.updateById(id, {
        user: user.id,
        likes: likes + 1,
        author,
        title,
        url,
      })
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Liking blog failed')
    }
  }

  const deleteBlog = async ({ id, title, author }) => {
    if (!confirm(`Remove blog "${title}" by ${author || 'UNKNOWN'}?`)) {
      return
    }

    try {
      await blogService.deleteById(id, user.token)
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
          <LoginForm onLogin={login} ref={loginFormRef} />
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
            <BlogForm onCreate={createBlog} ref={blogFormRef} />
          </Togglable>
        </>
      )}

      <hr />

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          isOwner={blog.user?.username === user?.username}
          onLike={() => likeBlog(blog)}
          onDelete={() => deleteBlog(blog)}
        />
      ))}
    </>
  )
}
