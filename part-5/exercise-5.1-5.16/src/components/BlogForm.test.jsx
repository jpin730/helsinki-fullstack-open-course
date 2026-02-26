import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { BlogForm } from './BlogForm'

describe('BlogForm', () => {
  it('calls onCreate with the correct details when form is submitted', async () => {
    // Arrange
    const mockedOnCreate = vi.fn()
    render(<BlogForm onCreate={mockedOnCreate} />)

    // Act
    await userEvent.type(screen.getByRole('textbox', { name: /title/i }), 'Test Blog')
    await userEvent.type(screen.getByRole('textbox', { name: /author/i }), 'John Doe')
    await userEvent.type(screen.getByRole('textbox', { name: /url/i }), 'https://example.com')
    await userEvent.click(screen.getByRole('button', { name: /create/i }))

    // Assert
    expect(mockedOnCreate).toHaveBeenCalledTimes(1)
    expect(mockedOnCreate).toHaveBeenCalledWith({
      title: 'Test Blog',
      author: 'John Doe',
      url: 'https://example.com',
    })
  })
})
