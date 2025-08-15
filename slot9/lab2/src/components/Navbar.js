import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm justify-content-center">
      <Container className="justify-content-center">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          VipMovie
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav>
            <Nav.Link as={NavLink} to="/" end>
              Free Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favourites">
              My Favourite Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/form">
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
