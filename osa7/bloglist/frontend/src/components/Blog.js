import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedInUser, onLike, onRemove }) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  }
  const buttonStyle = {
    marginLeft: 5
  }

  const [showAll, setShowAll] = useState(false)

  const handleLike = async () => {
    const newLikes = blog.likes + 1
    onLike(
      blog.id,
      blog.title,
      blog.author,
      blog.url,
      newLikes)
  }

  const handleRemove = async () => {
    if (window.confirm(`Do you want to remove ${blog.name}?`)) {
      onRemove(blog.id)
    }
  }

  const deleteBlog = () => {
    if (loggedInUser.username !== blog.user.username) return

    return (
      <button style={buttonStyle} onClick={() => handleRemove()} name='remove'>Remove</button>
    )
  }

  const getDetails = () => {
    return (
      <>
        <p><a href="{blog.url}">{blog.url}</a></p>
        <p>Likes: {blog.likes}
          <button style={buttonStyle} onClick={() => handleLike()} name='like'>Like</button>
        </p>
        {
          blog.user && <p>{blog.user.name}</p>
        }
        {deleteBlog()}
      </>
    )
  }
  return (
    <div style={blogStyle} className='blogItem'>
      <p>
        <strong>{blog.title}</strong> by {blog.author}
        {showAll && <button style={buttonStyle} onClick={() => setShowAll(false)}>Hide</button>}
        {!showAll && <button style={buttonStyle} onClick={() => setShowAll(true)}>View</button>}
      </p>

      {showAll && getDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}
export default Blog