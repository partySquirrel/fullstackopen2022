import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import LogoutForm from './LogoutForm'
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = () => {
  const user = useSelector((state) => state.loggedInUser)

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand href="#">Blog List</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <LinkContainer to="/blogs">
              <Nav.Link>Blogs</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/users">
              <Nav.Link>Users</Nav.Link>
            </LinkContainer>

            {!user && (
              <LinkContainer to="/">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>

          {user && (
            <Navbar.Text>
              <LogoutForm className="d-flex" />
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
