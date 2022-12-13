import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showError, showNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

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

  return (
    <div style={blogStyle} className="blogItem">
      <h2>
        {blog.title} by {blog.author}
      </h2>
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
      <h3>Comments</h3>
      <div>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
