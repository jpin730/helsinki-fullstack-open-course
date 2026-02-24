import { useEffect, useState } from 'react'

import { Blog } from './components/Blog'
import { BlogEditor } from './components/BlogEditor'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Toggable'
import blogService from './services/blogs'

const LOGGED_USER_KEY = 'loggedBlogAppUser'

export const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
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

  const onMessage = (message, isError = false) => {
    setMessage({ text: message, isError })
    setTimeout(() => {
      setMessage(null)
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

      {message && (
        <p
          style={{
            border: message.isError ? '2px solid red' : '2px solid green',
            color: message.isError ? 'red' : 'green',
            borderRadius: '5px',
            padding: '10px',
          }}
        >
          {message.text}
        </p>
      )}

      {!user && (
        <Togglable buttonLabel="Login">
          <LoginForm onLogin={onLogin} onMessage={onMessage} />
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
            <BlogEditor onCreate={onCreate} onMessage={onMessage} token={user.token} />
          </Togglable>
        </>
      )}

      <ol>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ol>
    </>
  )
}
