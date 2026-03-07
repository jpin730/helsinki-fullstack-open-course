import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router'

import { Blog } from './components/Blog'
import { BlogForm } from './components/BlogForm'
import { Blogs } from './components/Blogs'
import { LoginForm } from './components/LoginForm'
import { Navigation } from './components/Navigation'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'
import { User } from './components/User'
import { Users } from './components/Users'
import { Path } from './consts/Path'
import { NotificationContext } from './contexts/NotificationContext'
import { useNotification } from './hooks/useNotification'
import { useUser } from './hooks/useUser'

export const App = () => {
  const { user, login, logout } = useUser()

  const { notification, notify, notifyError } = useNotification()

  return (
    <NotificationContext.Provider value={{ notification, notify, notifyError }}>
      <Navigation user={user} logout={logout} />

      <Container className="py-3">
        <h1>Blogs App</h1>
        <Notification />
        {!user && (
          <Togglable label="Login" labelVariant="primary">
            <LoginForm login={login} />
          </Togglable>
        )}
        {user && (
          <Togglable label="Create new blog" labelVariant="primary">
            <BlogForm />
          </Togglable>
        )}
        <hr />
        <main>
          <Routes>
            <Route path={Path.Blogs} element={<Blogs />} />
            <Route path={Path.BlogById} element={<Blog />} />
            <Route path={Path.Users} element={<Users />} />
            <Route path={Path.UserById} element={<User />} />
          </Routes>
        </main>
      </Container>
    </NotificationContext.Provider>
  )
}
