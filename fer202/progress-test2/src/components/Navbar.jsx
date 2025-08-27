import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AppNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="shadow-sm"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/products"
          className="d-flex align-items-center"
        >
          My Shop
        </Navbar.Brand>

        {/* Collapse cho mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/favourites">
              <FaHeart size={20} /> Favourites
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart">
              <FaShoppingCart size={20} /> Cart
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <Nav.Link onClick={logout}>
                <FaUser size={20} /> Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                <FaUser size={20} /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
