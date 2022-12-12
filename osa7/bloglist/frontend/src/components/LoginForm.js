import React from 'react'
import { useField } from '../hooks'
import { showError, showNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

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

      <form onSubmit={handleLogin} className="loginForm">
        <div>
          <label>
            Username:{' '}
            <input name="username" placeholder="username" {...username} />
          </label>
        </div>
        <div>
          <label>
            Password:{' '}
            <input name="password" placeholder="password" {...password} />
          </label>
        </div>
        <div>
          <button type="submit" id="login">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
