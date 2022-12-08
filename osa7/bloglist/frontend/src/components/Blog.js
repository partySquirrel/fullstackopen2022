import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showError, showNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, loggedInUser }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  }
  const buttonStyle = {
    marginLeft: 5,
  }

  const [showAll, setShowAll] = useState(false)

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
      <button style={buttonStyle} onClick={() => handleRemove()} name="remove">
        Remove
      </button>
    )
  }

  const getDetails = () => {
    return (
      <>
        <p>
          <a href="{blog.url}">{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes}
          <button style={buttonStyle} onClick={() => handleLike()} name="like">
            Like
          </button>
        </p>
        {blog.user && <p>{blog.user.name}</p>}
        {deleteBlog()}
      </>
    )
  }
  return (
    <div style={blogStyle} className="blogItem">
      <p>
        <strong>{blog.title}</strong> by {blog.author}
        {showAll && (
          <button style={buttonStyle} onClick={() => setShowAll(false)}>
            Hide
          </button>
        )}
        {!showAll && (
          <button style={buttonStyle} onClick={() => setShowAll(true)}>
            View
          </button>
        )}
      </p>

      {showAll && getDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
}
export default Blog
