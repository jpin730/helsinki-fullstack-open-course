import { Route, Routes } from 'react-router'

import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { Blogs } from './components/Blogs'
import { LoginForm } from './components/LoginForm'
import { Navigation } from './components/Navigation'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'
import { Users } from './components/Users'
import { Path } from './consts/Path'
import { useUser } from './hooks/useUser'

export const App = () => {
  const { user, login, logout } = useUser()

  return (
    <>
      <Navigation user={user} logout={logout} />

      <h1>Blogs</h1>

      <Notification />

      {!user && (
        <Togglable label="Login">
          <LoginForm login={login} />
        </Togglable>
      )}

      {user && (
        <Togglable label="Create new blog">
          <BlogForm />
        </Togglable>
      )}

      <hr />

      <main>
        <Routes>
          <Route path={Path.Blogs} element={<Blogs />} />
          <Route path={Path.BlogById} element={<Blog />} />
          <Route path={Path.Users} element={<Users />} />
        </Routes>
      </main>
    </>
  )
}
