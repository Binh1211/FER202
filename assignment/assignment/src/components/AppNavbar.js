import React, { useContext } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { Image } from "react-bootstrap";

function AppNavbar() {
  const { user, logout } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);

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
          ShoppeFake
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Links chính */}
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
              to="/wishlist"
              style={({ isActive }) => ({
                color: isActive ? "orange" : "black",
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              Wishlist
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/cart"
              style={({ isActive }) => ({
                color: isActive ? "orange" : "black",
                fontWeight: isActive ? "bold" : "normal",
                position: "relative",
              })}
            >
              Cart
              {user
                ? cartItems.length > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      style={{
                        position: "absolute",
                        top: "-2px",
                        right: "-17px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {cartItems.length}
                    </Badge>
                  )
                : null}
            </Nav.Link>
          </Nav>

          {/* User */}
          <Nav>
            {user ? (
              <NavDropdown
                align="end"
                title={
                  <>
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        roundedCircle
                        width={30}
                        height={30}
                        className="me-1"
                      />
                    ) : (
                      <FaUserCircle size={20} className="me-1" />
                    )}
                    {user.name}
                  </>
                }
                id="user-dropdown"
              >
                <NavDropdown.Item as={NavLink} to="/profile">
                  Account
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/wishlist">
                  Wishlist
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={NavLink}
                to="/login"
                style={({ isActive }) => ({
                  color: isActive ? "orange" : "black",
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                Sign in
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
