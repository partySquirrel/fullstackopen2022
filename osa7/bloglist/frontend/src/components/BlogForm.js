import { useField } from '../hooks'
import { showError, showNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import React, { useRef } from 'react'
import Togglable from './Togglable'

const BlogForm = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const dispatch = useDispatch()

  const refBlogForm = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    dispatch(createBlog(blog, loggedInUser))
      .then(() => {
        refBlogForm.current.toggleVisibility()
        dispatch(
          showNotification(
            `a new blog ${blog.title} by ${blog.author} added`,
            5
          )
        )
        title.onReset()
        author.onReset()
        url.onReset()
      })
      .catch((error) => {
        dispatch(
          showError(`failed to create blog: ${error.response.data.error}`, 5)
        )
      })
  }

  return (
    <Togglable buttonLabel="Add new blog" ref={refBlogForm}>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit} className="blogForm">
        <div>
          <label>
            Title:{' '}
            <input name="title" placeholder="title of the blog" {...title} />
          </label>
        </div>
        <div>
          <label>
            Author:{' '}
            <input name="author" placeholder="author of the blog" {...author} />
          </label>
        </div>
        <div>
          <label>
            URL: <input name="url" placeholder="url of the blog" {...url} />
          </label>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </Togglable>
  )
}

export default BlogForm
