import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const loggedBlogUserKey = 'loggedBlogUser'

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedBlogUserKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      sortBlogs(blogs)
      setBlogs(blogs)
    }
    )
  }, [])

  function updateBlogList(bloglist) {
    sortBlogs(bloglist)
    setBlogs(bloglist)
  }

  function sortBlogs(bloglist) {
    bloglist.sort((a, b) => b.likes - a.likes)
  }

  const handleLogout = async () => {
    window.localStorage.removeItem(loggedBlogUserKey)
    setUser(null)
    setSuccessMessage('user logged out')
  }

  const handleNewBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create(
        title,
        author,
        url,
        user,
      )

      updateBlogList(blogs.concat(blog))

      refBlogForm.current.toggleVisibility()
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      return blog

    } catch (exception) {
      setErrorMessage(`failed to create blog: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (id, title, author, url, likes) => {
    try {
      const updated = await blogService.update(
        id,
        title,
        author,
        url,
        likes
      )
      updateBlogList(blogs.map(blog => blog.id === updated.id ? updated : blog))
      setSuccessMessage(`liked the blog ${updated.title} by ${updated.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      return updated
    } catch (exception) {
      setErrorMessage(`failed to like blog: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemoveBlog = async (id) => {
    try {
      const nukedBlog = blogs.filter(blog => blog.id === id)
      await blogService.remove(
        id,
        user
      )
      updateBlogList(blogs.filter(blog => blog.id !== id))
      setSuccessMessage(`Removed the blog ${nukedBlog.title} by ${nukedBlog.author}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`failed to remove blog: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)

      window.localStorage.setItem(
        loggedBlogUserKey, JSON.stringify(user)
      )

      setSuccessMessage('login success')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      return user
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const refBlogForm = useRef()

  const AddBlog = () => {
    return (
      <Togglable buttonLabel='Add new blog' ref={refBlogForm}>
        <h2>Add new blog</h2>
        <BlogForm
          onSubmit={handleNewBlog}
        />
      </Togglable>
    )
  }

  const Login = () => {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          onSubmit={handleLogin}
        />
      </div>
    )
  }

  const Logout = () => {
    return (
      <p>
        User {user.name} logged in. <button onClick={() => handleLogout()}>Log out</button>
      </p>
    )
  }

  const Blogs = () => {
    return (
      <div>
        <h2>List of blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} loggedInUser={user} onLike={handleUpdateBlog} onRemove={handleRemoveBlog}/>
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
      {user !== null && AddBlog()}
      {user !== null && Blogs()}

    </div>
  )
}

export default App
