import { useImperativeHandle, useState } from 'react'

export const LoginForm = ({ ref, onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    onLogin({ username, password })
  }

  const reset = () => {
    setUsername('')
    setPassword('')
  }

  useImperativeHandle(ref, () => {
    return { reset }
  })

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
