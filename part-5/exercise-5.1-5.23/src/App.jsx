import { useEffect, useState } from 'react'

import { Blog } from './components/Blog'
import { BlogEditor } from './components/BlogEditor'
import { LoginForm } from './components/LoginForm'
import blogService from './services/blogs'

const LOGGED_USER_KEY = 'loggedBlogAppUser'

export const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(
    function fetchBlogs() {
      if (user) {
        blogService.getAll().then((blogs) => setBlogs(blogs))
      }
    },
    [user],
  )

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

      {!user && <LoginForm onLogin={onLogin} onMessage={onMessage} />}

      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            <b>{user.name}</b> logged in
          </p>
          <p>
            <button onClick={onLogout}>Logout</button>
          </p>

          <BlogEditor onCreate={onCreate} onMessage={onMessage} token={user.token} />

          <ol>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
