import React from 'react'
import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import LogoutForm from './components/LogoutForm'
import { initializeUsers } from './reducers/userReducer'
import { Routes, Route, Link } from 'react-router-dom'
import Blogs from './components/Blogs'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const user = useSelector((state) => state.loggedInUser)

  const Home = () => <div></div>

  return (
    <div>
      <div>
        <Link to="/">home</Link>
        <Link to="/blogs">blogs</Link>
        <Link to="/users">users</Link>
      </div>

      <h1>Blogs</h1>
      <Notification />

      {user === null && <LoginForm />}
      {user !== null && <LogoutForm />}

      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
