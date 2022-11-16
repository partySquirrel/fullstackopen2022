import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`login success`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleInputUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleInputPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const Login = () => {
    if (user !== null) {
      return (
        <p> User {user.name} logged in.</p>
      )
    }

    return (user === null &&
      <div>
        <h2>Login</h2>
        <LoginForm
          onSubmit={handleLogin}
          onUsernameChange={handleInputUsernameChange}
          username={username}
          onPasswordChange={handleInputPasswordChange}
          password={password}
        />
      </div>
    )
  }
  const Logout = () => {
    return (
      <p> User {user.name} logged in.</p>
    )
  }

  const Blogs = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} severity="error"/>
      <Notification message={successMessage} severity="success"/>

      {user === null && Login()}
      {user !== null && Logout()}
      {user !== null && Blogs()}


    </div>
  )
}

export default App
