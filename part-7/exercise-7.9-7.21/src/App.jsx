import { useRef } from 'react'

import { BlogForm } from './components/BlogForm'
import { Blogs } from './components/Blogs'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'
import { useUser } from './reducers/useUser'

export const App = () => {
  const blogFormTogglableRef = useRef()

  const { user, login, logout } = useUser()

  const toggleBlogFormVisibility = () => blogFormTogglableRef.current.toggleVisibility()

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
            <BlogForm onCreate={toggleBlogFormVisibility} />
          </Togglable>
        </>
      )}

      <hr />

      <Blogs />
    </>
  )
}
