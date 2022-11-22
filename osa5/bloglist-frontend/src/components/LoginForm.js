import { useState } from "react";

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

    const user = await onSubmit({ username, password})
    if (user) {
      setUsername('')
      setPassword('')
    }
  }

  return (
  <form onSubmit={handleLogin}>
    <div>
      <label>
        Username: <input type="text" key="username" name="username" value={username} onChange={handleInputUsernameChange}/>
      </label>
    </div>
    <div>
      <label>
        Password: <input type="password" key="password" name="password" value={password} onChange={handleInputPasswordChange}/>
      </label>
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
  </form>
)}

export default LoginForm