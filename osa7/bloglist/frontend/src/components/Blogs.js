import React from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import { Stack } from 'react-bootstrap'

const Blogs = () => {
  const user = useSelector((state) => state.loggedInUser)

  if (!user) return null

  return (
    <Stack gap={3}>
      <BlogForm />
      <BlogList />
    </Stack>
  )
}

export default Blogs
