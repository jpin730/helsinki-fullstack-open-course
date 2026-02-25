import { render, screen } from '@testing-library/react'

import { Blog } from './Blog'

test('renders content by default state', () => {
  // Arrange
  const blog = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 5,
    user: {
      name: 'Jane Smith',
    },
  }

  render(<Blog blog={blog} />)

  // Act

  // Assert
  const titleElement = screen.getByRole('heading', { level: 3 })
  expect(titleElement).toBeDefined()
  expect(titleElement).toHaveTextContent('Test Blog')
  expect(titleElement).toHaveTextContent('John Doe')

  const urlElement = screen.queryByText('https://example.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('5 likes')
  expect(likesElement).toBeNull()

  const userElement = screen.queryByText('Jane Smith')
  expect(userElement).toBeNull()
})
