import { useEffect, useState } from 'react'

import { Blog } from './components/Blog'
import { LoginForm } from './components/LoginForm'
import blogService from './services/blogs'

export const App = () => {
  const [user, _] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user])

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  )
}
