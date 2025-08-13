import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm justify-content-center">
      <Container className="justify-content-center">
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          Healthy Recipe Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/">Recipes</Nav.Link>
            <Nav.Link href="/request">Recipe Request Form</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button variant="success" className="ms-3">
          Browse recipes
        </Button>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
