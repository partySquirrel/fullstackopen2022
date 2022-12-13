import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showError, showNotification } from '../reducers/notificationReducer'
import { Link, useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import Button from 'react-bootstrap/Button'
import { ButtonGroup, ButtonToolbar, Card, Stack } from 'react-bootstrap'

const Blog = () => {
  const id = useParams().id
  let blog = null

  if (id) {
    const blogs = useSelector((state) => state.blogs)
    blog = blogs.find((b) => b.id === id)
  }

  if (!blog) {
    return null
  }

  const loggedInUser = useSelector((state) => state.loggedInUser)

  const dispatch = useDispatch()

  const handleLike = async () => {
    dispatch(likeBlog(blog))
      .then(() => {
        dispatch(showNotification(`Liked '${blog.title}'`, 5))
      })
      .catch((error) => {
        dispatch(
          showError(`failed to like blog: ${error.response.data.error}`, 5)
        )
      })
  }

  const handleRemove = async () => {
    if (window.confirm(`Do you want to remove ${blog.title}?`)) {
      dispatch(removeBlog(blog, loggedInUser))
        .then(() => {
          dispatch(
            showNotification(
              `Removed the blog ${blog.title} by ${blog.author}`,
              5
            )
          )
        })
        .catch((error) => {
          dispatch(
            showError(`failed to remove blog: ${error.response.data.error}`, 5)
          )
        })
    }
  }

  const deleteBlog = () => {
    if (loggedInUser.username !== blog.user.username) return

    return (
      <Button variant="warning" onClick={() => handleRemove()} name="remove">
        Remove
      </Button>
    )
  }

  return (
    <Stack gap={3}>
      <Card>
        <Card.Header as="h2">
          {blog.title} by {blog.author}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <a href="{blog.url}">{blog.url}</a>
          </Card.Text>
          <Card.Text>Likes: {blog.likes}</Card.Text>
          {blog.user && (
            <Card.Text>
              Saved by{' '}
              <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
            </Card.Text>
          )}

          <ButtonToolbar aria-label="buttons">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="info" onClick={() => handleLike()} name="like">
                Like
              </Button>
            </ButtonGroup>
            <ButtonGroup className="me-2" aria-label="Second group">
              {deleteBlog()}
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Body>
      </Card>

      <div>
        <h3>Comments</h3>
        <CommentForm blog={blog} />
        <div>
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </Stack>
  )
}

export default Blog
