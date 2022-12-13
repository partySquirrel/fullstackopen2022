import React from 'react'
import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import LogoutForm from './components/LogoutForm'
import { initializeUsers } from './reducers/userReducer'
import { Routes, Route, Navigate } from 'react-router-dom'
import Blogs from './components/Blogs'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

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
    <div className="container">
      <Navigation />

      <h1>Blogs</h1>
      <Notification />

      {user === null && <LoginForm />}
      {user !== null && <LogoutForm />}

      <Routes>
        <Route
          path="/blogs/:id"
          element={user ? <Blog /> : <Navigate replace to="/" />}
        />
        <Route
          path="/blogs"
          element={user ? <Blogs /> : <Navigate replace to="/" />}
        />
        <Route
          path="/users/:id"
          element={user ? <User /> : <Navigate replace to="/" />}
        />
        <Route
          path="/users"
          element={user ? <UserList /> : <Navigate replace to="/" />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
