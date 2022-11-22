import React, { useState } from "react";

const Blog = ({ blog }) => {
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

  const getDetails = () => {
    return (
      <>
        <p><a href="{blog.url}">{blog.url}</a></p>
        <p>Likes: {blog.likes}</p>
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