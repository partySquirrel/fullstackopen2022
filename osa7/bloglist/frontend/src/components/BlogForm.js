import { useField } from '../hooks'
import { showError, showNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import React, { useRef } from 'react'
import Togglable from './Togglable'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    <Togglable buttonLabel="Add a new blog" ref={refBlogForm}>
      <h2>Add a new blog</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control placeholder="Enter title of the blog" {...title} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control placeholder="Enter author of the blog" {...author} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control placeholder="Enter URL of the blog" {...url} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Togglable>
  )
}

export default BlogForm
