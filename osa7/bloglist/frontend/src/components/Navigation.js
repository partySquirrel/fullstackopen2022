import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutForm from './LogoutForm'

const Navigation = () => {
  const user = useSelector((state) => state.loggedInUser)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/blogs">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user ? <LogoutForm /> : <Link to="/">Login</Link>}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
