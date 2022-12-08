import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('<LoginForm />', () => {
  let container
  const onSubmitHandler = jest.fn()

  beforeEach(() => {
    container = render(<LoginForm onSubmit={onSubmitHandler} />).container
  })

  test('renders form', () => {
    const element = container.querySelector('.loginForm')
    expect(element).toBeDefined()
  })

  test('renders form input fields', () => {
    expect(screen.getByPlaceholderText('your username')).toBeDefined()
    expect(screen.getByPlaceholderText('your password')).toBeDefined()
    expect(screen.getByText('Login')).toBeDefined()
  })

  test('calls onSubmit with input values', async () => {
    const user = userEvent.setup()
    const submit = screen.getByText('Login')

    await user.type(screen.getByPlaceholderText('your username'), 'userA')
    await user.type(screen.getByPlaceholderText('your password'), 'passwordA')
    await user.click(submit)

    expect(onSubmitHandler.mock.calls).toHaveLength(1)
    expect(onSubmitHandler.mock.calls[0][0]).toMatchObject({
      username: 'userA',
      password: 'passwordA',
    })
  })
})
