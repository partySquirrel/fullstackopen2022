import React from 'react'
import { useField } from '../hooks'
import { showError, showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { InputGroup } from 'react-bootstrap'

const CommentForm = ({ blog }) => {
  if (!blog) return null

  const comment = useField('text')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    dispatch(commentBlog(blog, comment.value))
      .then(() => {
        dispatch(showNotification(`Commented '${blog.title}'`, 5))
        comment.onReset()
      })
      .catch((error) => {
        dispatch(
          showError(`failed to comment blog: ${error.response.data.error}`, 5)
        )
      })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter comment"
          aria-label="Enter comment"
          aria-describedby="comment"
          {...comment}
        />
        <Button type="submit" variant="primary" id="button-comment">
          Add Comment
        </Button>
      </InputGroup>
    </Form>
  )
}

export default CommentForm
