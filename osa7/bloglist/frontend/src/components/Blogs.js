import React from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Blogs = () => {
  const user = useSelector((state) => state.loggedInUser)

  return (
    <>
      {user !== null && <BlogForm />}
      {user !== null && <BlogList />}
    </>
  )
}

export default Blogs
