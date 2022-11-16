import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const loggedBlogUserKey = 'loggedBlogUser';

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loggedBlogUserKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogout = async () => {
    window.localStorage.removeItem(loggedBlogUserKey)
    setUser(null)
    setSuccessMessage(`user logged out`)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create(
        title,
        author,
        url,
        user,
      )

      setBlogs(blogs.concat(blog))

      setTitle('')
      setAuthor('')
      setUrl('')

      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      console.log(exception)
      setErrorMessage(`failed to create blog: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)

      window.localStorage.setItem(
        loggedBlogUserKey, JSON.stringify(user)
      )

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

  const handleInputTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleInputAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleInputUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const AddBlog = () => {
    return (
      <div>
        <h2>Add new blog</h2>
        <BlogForm
          onSubmit={handleAddBlog}
          onTitleChange={handleInputTitleChange}
          title={title}
          onAuthorChange={handleInputAuthorChange}
          author={author}
          onUrlChange={handleInputUrlChange}
          url={url}
        />
      </div>
    )
  }

  const Login = () => {
    return (
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
      {user !== null && AddBlog()}
      {user !== null && Blogs()}

    </div>
  )
}

export default App
