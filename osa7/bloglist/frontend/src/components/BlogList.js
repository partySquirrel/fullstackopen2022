import { useSelector } from 'react-redux'
import React from 'react'
import Blog from './Blog'

const BlogList = ({ loggedInUser }) => {
  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => b.likes - a.likes)
  })

  return (
    <>
      <h2>List of blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog key={blog.id} blog={blog} loggedInUser={loggedInUser} />
        </div>
      ))}
    </>
  )
}

export default BlogList
