import { BlogForm } from './components/BlogForm'
import { Blogs } from './components/Blogs'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Toggable'
import { UserSection } from './components/UserSection'
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

      <Blogs />
    </>
  )
}
