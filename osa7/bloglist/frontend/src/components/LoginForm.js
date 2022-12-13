import React from 'react'
import { useField } from '../hooks'
import { showError, showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username.value, password.value))
      .then(() => {
        dispatch(showNotification('login success', 5))
        username.onReset()
        password.onReset()
      })
      .catch(() => {
        dispatch(showError('wrong credentials', 5))
      })
  }

  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter username" {...username} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
