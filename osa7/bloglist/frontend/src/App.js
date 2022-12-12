import React from 'react'
import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { initializeUser } from './reducers/loginReducer'
import LogoutForm from './components/LogoutForm'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const user = useSelector((state) => state.loggedInUser)

  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

      {user === null && <LoginForm />}
      {user !== null && <LogoutForm />}
      {user !== null && <BlogForm />}
      {user !== null && <BlogList />}
    </div>
  )
}

export default App
