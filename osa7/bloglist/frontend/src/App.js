import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { showError, showNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const loggedBlogUserKey = 'loggedBlogUser'

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedBlogUserKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      sortBlogs(blogs)
      setBlogs(blogs)
    })
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
    dispatch(showNotification('user logged out', 5))
  }

  const handleNewBlog = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create(title, author, url, user)

      updateBlogList(blogs.concat(blog))

      refBlogForm.current.toggleVisibility()

      dispatch(showNotification(`a new blog ${blog.title} by ${blog.author} added`, 5))

      return blog
    } catch (exception) {
      dispatch(showError(`failed to create blog: ${exception.response.data.error}`, 5))
    }
  }

  const handleUpdateBlog = async (id, title, author, url, likes) => {
    try {
      const updated = await blogService.update(id, title, author, url, likes)
      updateBlogList(blogs.map((blog) => (blog.id === updated.id ? updated : blog)))

      dispatch(showNotification(`liked the blog ${updated.title} by ${updated.author}`, 5))

      return updated
    } catch (exception) {
      dispatch(showError(`failed to like blog: ${exception.response.data.error}`, 5))
    }
  }

  const handleRemoveBlog = async (id) => {
    try {
      const nukedBlog = blogs.filter((blog) => blog.id === id)
      await blogService.remove(id, user)
      updateBlogList(blogs.filter((blog) => blog.id !== id))

      dispatch(showNotification(`Removed the blog ${nukedBlog.title} by ${nukedBlog.author}`, 5))

    } catch (exception) {
      dispatch(showError(`failed to remove blog: ${exception.response.data.error}`, 5))
    }
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)

      window.localStorage.setItem(loggedBlogUserKey, JSON.stringify(user))

      dispatch(showNotification('login success', 5))

      return user
    } catch (exception) {
      dispatch(showError('wrong credentials', 5))
    }
  }

  const refBlogForm = useRef()

  const AddBlog = () => {
    return (<Togglable buttonLabel="Add new blog" ref={refBlogForm}>
      <h2>Add new blog</h2>
      <BlogForm onSubmit={handleNewBlog}/>
    </Togglable>)
  }

  const Login = () => {
    return (<div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin}/>
    </div>)
  }

  const Logout = () => {
    return (<p>
      User {user.name} logged in.{' '}
      <button onClick={() => handleLogout()} id="logout">
        Log out
      </button>
    </p>)
  }

  const Blogs = () => {
    return (<div>
      <h2>List of blogs</h2>
      {blogs.map((blog) => (<Blog
        key={blog.id}
        blog={blog}
        loggedInUser={user}
        onLike={handleUpdateBlog}
        onRemove={handleRemoveBlog}
      />))}
    </div>)
  }

  return (<div>
    <h1>Blogs</h1>

    <Notification/>

    {user === null && Login()}
    {user !== null && Logout()}
    {user !== null && AddBlog()}
    {user !== null && Blogs()}
  </div>)
}

export default App
