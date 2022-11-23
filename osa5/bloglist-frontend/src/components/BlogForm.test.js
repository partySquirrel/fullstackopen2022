import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let container
  const onSubmitHandler = jest.fn()

  beforeEach(() => {
    container = render(<BlogForm onSubmit={onSubmitHandler}/>).container
  })

  test('renders form', () => {
    const element = container.querySelector('.blogForm')
    expect(element).toBeDefined()
  })

  test('renders form input fields', () => {
    expect(screen.getByPlaceholderText('author of the blog')).toBeDefined()
    expect(screen.getByPlaceholderText('title of the blog')).toBeDefined()
    expect(screen.getByPlaceholderText('url of the blog')).toBeDefined()
    expect(screen.getByText('Create')).toBeDefined()
  })

  test('calls onSubmit with input values', async () => {
    const user = userEvent.setup()
    const submit = screen.getByText('Create')

    await user.type(screen.getByPlaceholderText('author of the blog'), 'Blogger')
    await user.type(screen.getByPlaceholderText('title of the blog'), 'Bloggity Blog')
    await user.type(screen.getByPlaceholderText('url of the blog'), 'http://example.com/blog')
    await user.click(submit)

    expect(onSubmitHandler.mock.calls).toHaveLength(1)
    expect(onSubmitHandler.mock.calls[0][0]).toMatchObject({
      author: 'Blogger',
      title: 'Bloggity Blog',
      url: 'http://example.com/blog',
    })
  })
})
