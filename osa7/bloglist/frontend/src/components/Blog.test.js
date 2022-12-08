import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const likeHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      blog: {
        author: 'Author X',
        title: 'Title Y',
        url: 'http://example.com',
        likes: 2,
        user: {
          username: 'UserB',
          name: 'User B',
        },
      },
      loggedInUser: {
        name: 'User A',
        username: 'UserA',
      },
      onLike: likeHandler,
      onRemove: jest.fn(),
    }
    render(<Blog {...blog} />).container
  })

  test('renders empty blog', () => {
    const blog = {
      blog: {},
      loggedInUser: {},
      onLike: jest.fn(),
      onRemove: jest.fn(),
    }
    const { container } = render(<Blog {...blog} />)
    const element = container.querySelector('.blogItem')
    expect(element).toBeDefined()
  })

  test('renders only title and author by default', async () => {
    expect(screen.getByText('Title Y')).toBeDefined()
    expect(screen.getByText('by Author X')).toBeDefined()
    expect(screen.getByText('View')).toBeDefined()

    expect(
      await screen.queryByText('http://example.com')
    ).not.toBeInTheDocument()
    expect(await screen.queryByText('User B')).not.toBeInTheDocument()
    expect(await screen.queryByText('Likes: 2')).not.toBeInTheDocument()
    expect(await screen.queryByText('Hide')).not.toBeInTheDocument()
  })

  test('renders full blog content when show is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    expect(screen.getByText('Title Y')).toBeDefined()
    expect(screen.getByText('by Author X')).toBeDefined()
    expect(screen.getByText('http://example.com')).toBeDefined()
    expect(screen.getByText('User B')).toBeDefined()
    expect(screen.getByText('Likes: 2')).toBeDefined()
    expect(screen.getByText('Hide')).toBeDefined()
    expect(screen.getByText('Like')).toBeDefined()
  })

  test('calls like twice if clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const likeButton = screen.getByText('Like')
    expect(likeButton).toBeDefined()
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
