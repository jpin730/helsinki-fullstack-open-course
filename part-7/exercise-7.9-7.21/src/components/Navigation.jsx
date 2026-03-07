import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router'

import { Path } from '../consts/Path'

export const Navigation = ({ user, logout }) => {
  const getIsActiveClassName = ({ isActive }) => (isActive ? 'text-white fw-semibold' : '')

  return (
    <Navbar expand="sm" bg="primary" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to={Path.Blogs}>
          Blogs App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={NavLink} to={Path.Blogs} className={getIsActiveClassName}>
              Blogs
            </Nav.Link>
            <Nav.Link as={NavLink} to={Path.Users} className={getIsActiveClassName}>
              Users
            </Nav.Link>
            {user && (
              <NavDropdown menuVariant="dark" className="d-block d-sm-none" title={user.name}>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
        {user && (
          <Nav className="d-none d-sm-flex">
            <NavDropdown title={user.name}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
}
