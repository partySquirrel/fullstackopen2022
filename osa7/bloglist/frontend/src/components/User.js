import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Card, ListGroup, Stack } from 'react-bootstrap'

const User = () => {
  const id = useParams().id

  if (!id) return null

  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)

  if (!user) return null

  return (
    <Stack gap={3}>
      <Card>
        <Card.Header as="h2">{user.name}</Card.Header>

        {user.blogs.length > 0 && (
          <ListGroup variant="flush">
            {user.blogs.map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {user.blogs.length === 0 && (
          <Card.Body>
            <Card.Text>No blogs</Card.Text>
          </Card.Body>
        )}
      </Card>
    </Stack>
  )
}

export default User
