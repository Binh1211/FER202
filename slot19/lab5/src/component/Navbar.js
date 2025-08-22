import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/ThemeContext";
function AppNavbar() {
  const { user, logout } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          Vip Restaurant
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              style={({ isActive }) => ({
                color: isActive ? "orange" : "black",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/cart"
              style={({ isActive }) => ({
                color: isActive ? "orange" : "black",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Cart
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/register"
              style={({ isActive }) => ({
                color: isActive ? "orange" : "black",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Register Account
            </Nav.Link>
          </Nav>
          <Button className="btn" onClick={toggleTheme}>
            {theme === "light" ? "Chế độ Tối" : "Chế độ Sáng"}
          </Button>
          <Nav>
            <NavDropdown
              align="end"
              title={<FaUserCircle size={24} />}
              id="user-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/favourites">
                My Favourites
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {user ? (
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              ) : (
                <NavDropdown.Item as={NavLink} to="/login">
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
