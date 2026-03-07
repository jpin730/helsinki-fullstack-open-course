import { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'

import { NotificationContext } from '../contexts/NotificationContext'
import { useTogglable } from '../hooks/useTogglable'

export const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { notifyError } = useContext(NotificationContext)

  const togglable = useTogglable()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await login({ username, password })
    } catch (error) {
      notifyError(error.response?.data?.error ?? 'Login failed')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          Username
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Password
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Stack direction="horizontal" gap={2}>
        <Button type="submit">Login</Button>
        {togglable.cancelButton}
      </Stack>
    </Form>
  )
}
