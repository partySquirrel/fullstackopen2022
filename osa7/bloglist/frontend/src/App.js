import React from 'react'
import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { showError, showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'

const App = () => {
  const [user, setUser] = useState(null)
  const loggedBlogUserKey = 'loggedBlogUser'

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedBlogUserKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogout = async () => {
    window.localStorage.removeItem(loggedBlogUserKey)
    setUser(null)
    dispatch(showNotification('user logged out', 5))
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)

      window.localStorage.setItem(loggedBlogUserKey, JSON.stringify(user))

      dispatch(showNotification('login success', 5))

      return user
    } catch (exception) {
      dispatch(showError('wrong credentials', 5))
    }
  }

  const Login = () => {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    )
  }

  const Logout = () => {
    return (
      <p>
        User {user.name} logged in.{' '}
        <button onClick={() => handleLogout()} id="logout">
          Log out
        </button>
      </p>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {user === null && Login()}
      {user !== null && Logout()}
      {user !== null && <BlogForm loggedInUser={user} />}
      {user !== null && <BlogList loggedInUser={user} />}
    </div>
  )
}

export default App
