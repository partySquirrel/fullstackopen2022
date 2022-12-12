import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  let user = null

  if (id) {
    const users = useSelector((state) => state.users)
    user = users.find((u) => u.id === id)
  }

  const UserDetails = () => {
    return (
      <>
        <h3>{user.name}</h3>
        <div>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  return <>{user && UserDetails(user)}</>
}

export default User
