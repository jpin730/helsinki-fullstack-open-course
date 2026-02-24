import { useEffect, useState } from 'react'

import { Blog } from './components/Blog'
import { BlogEditor } from './components/BlogEditor'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'
import blogService from './services/blogs'

const LOGGED_USER_KEY = 'loggedBlogAppUser'

export const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])

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

  const onNotify = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const onLogin = (user) => {
    setUser(user)
  }

  const onLogout = () => {
    setUser(null)
  }

  const onCreate = (blog) => {
    setBlogs(blogs.concat(blog))
  }

  return (
    <>
      <h1>Blogs</h1>

      <Notification notification={notification} />

      {!user && (
        <Togglable buttonLabel="Login">
          <LoginForm onLogin={onLogin} onNotify={onNotify} />
        </Togglable>
      )}

      {user && (
        <>
          <p>
            <b>{user.name}</b> logged in
          </p>

          <p>
            <button onClick={onLogout}>Logout</button>
          </p>

          <Togglable buttonLabel="Create new blog">
            <BlogEditor onCreate={onCreate} onNotify={onNotify} token={user.token} />
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
