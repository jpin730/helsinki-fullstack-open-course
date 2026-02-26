import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Blog } from './Blog'

describe('Blog', () => {
  const MOCKED_BLOG = {
    title: 'Test Blog',
    author: 'John Doe',
    url: 'https://example.com',
    likes: 5,
    user: {
      name: 'Jane Smith',
    },
  }

  it('renders content by default state', () => {
    // Arrange
    const blog = MOCKED_BLOG

    render(<Blog blog={blog} />)

    // Act

    // Assert
    const titleElement = screen.getByRole('heading', { level: 3 })
    expect(titleElement).toHaveTextContent('Test Blog')
    expect(titleElement).toHaveTextContent('John Doe')

    expect(screen.queryByText('https://example.com')).not.toBeInTheDocument()
    expect(screen.queryByText(/likes/)).not.toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })

  it('renders url, likes and user when view button is clicked', async () => {
    // Arrange
    const blog = MOCKED_BLOG

    render(<Blog blog={blog} />)

    // Act
    await userEvent.click(screen.getByRole('button', { name: 'view' }))

    // Assert
    expect(screen.queryByText('https://example.com')).toBeInTheDocument()
    expect(screen.queryByText(/5 likes/)).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).toBeInTheDocument()
  })

  it('calls the event handler twice when like button is clicked twice', async () => {
    // Arrange
    const blog = MOCKED_BLOG
    const mockedOnLike = vi.fn()

    render(<Blog blog={blog} onLike={mockedOnLike} />)

    // Act
    await userEvent.click(screen.getByRole('button', { name: 'view' }))
    await userEvent.click(screen.getByRole('button', { name: 'like' }))
    await userEvent.click(screen.getByRole('button', { name: 'like' }))

    // Assert
    expect(mockedOnLike).toHaveBeenCalledTimes(2)
  })
})
