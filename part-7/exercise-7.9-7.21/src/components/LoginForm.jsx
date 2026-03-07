import { useState } from 'react'
import { useNotification } from '../hooks/useNotification'

export const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { notifyError } = useNotification()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await login({ username, password })
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Login failed')
    }
  }

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}
