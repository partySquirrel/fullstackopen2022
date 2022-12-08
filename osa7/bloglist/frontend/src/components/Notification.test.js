import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Notification from './Notification'

test('renders content', () => {
  render(<Notification message="hello" severity="info" />)
  const element = screen.getByText('hello')
  expect(element).toBeDefined()
})

test('renders empty content', () => {
  const { container } = render(<Notification />)
  const element = container.querySelector('.notification')
  expect(element).toBeDefined()
  expect(element).toHaveTextContent('')
})
