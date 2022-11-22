import React, { useState } from "react";

const Blog = ({ blog, onLike }) => {
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

  const getDetails = () => {
    return (
      <>
        <p><a href="{blog.url}">{blog.url}</a></p>
        <p>Likes: {blog.likes}
          <button style={buttonStyle} onClick={() => handleLike()}>Like</button>
        </p>
        {
          blog.user && <p>{blog.user.name}</p>
        }
      </>
    )
  }
  return (
    <div style={blogStyle}>
      <p>
        <strong>{blog.title}</strong> by {blog.author}
        {showAll && <button style={buttonStyle} onClick={() => setShowAll(false)}>Hide</button>}
        {!showAll && <button style={buttonStyle} onClick={() => setShowAll(true)}>View</button>}
      </p>

      {showAll && getDetails()}
    </div>
  )
}

export default Blog