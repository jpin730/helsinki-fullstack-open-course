import { Route, Routes } from 'react-router'

import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { Blogs } from './components/Blogs'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'
import { UserSection } from './components/UserSection'
import { Path } from './consts/Path'
import { useUser } from './reducers/useUser'

export const App = () => {
  const { user, login, logout } = useUser()

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
          <UserSection user={user} logout={logout} />

          <Togglable label="Create new blog">
            <BlogForm />
          </Togglable>
        </>
      )}

      <hr />

      <Routes>
        <Route path={Path.Blogs} element={<Blogs />} />
        <Route path={Path.BlogById} element={<Blog />} />
      </Routes>
    </>
  )
}
