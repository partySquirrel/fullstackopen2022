import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleInputUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleInputPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await onSubmit({ username, password })
    if (user) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleLogin} className="loginForm">
      <div>
        <label>
          Username: <input type="text" key="username" name="username" value={username}
            onChange={handleInputUsernameChange} placeholder="your username"/>
        </label>
      </div>
      <div>
        <label>
          Password: <input type="password" key="password" name="password" value={password}
            onChange={handleInputPasswordChange} placeholder="your password"/>
        </label>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
export default LoginForm