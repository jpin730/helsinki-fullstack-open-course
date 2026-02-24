import { useEffect, useRef, useState } from 'react'

import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'

import blogService from './services/blogs'
import loginService from './services/login'

const LOGGED_USER_KEY = 'loggedBlogAppUser'
const NOTIFICATION_TIME_SECONDS = 5

export const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const notificationTimeoutRef = useRef()
  const blogFormRef = useRef()

  useEffect(function fetchBlogs() {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

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
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }

    setNotification({ message, isError })

    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null)
      notificationTimeoutRef.current = null
    }, NOTIFICATION_TIME_SECONDS * 1000)
  }

  const notifyError = (message) => notify(message, true)

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Login failed')
    }
  }

  const logout = () => setUser(null)

  const createBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create({ title, author, url }, user.token)
      blogFormRef.current.toggleVisibility()
      notify(`Blog "${blog.title}" created successfully`)
      setBlogs(blogs.concat(blog))
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Creating blog failed')
    }
  }

  return (
    <>
      <h1>Blogs</h1>

      <Notification notification={notification} />

      {!user && (
        <Togglable label="Login">
          <LoginForm onLogin={login} />
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

          <Togglable label="Create new blog" ref={blogFormRef}>
            <BlogForm onCreate={createBlog} />
          </Togglable>
        </>
      )}

      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  )
}
