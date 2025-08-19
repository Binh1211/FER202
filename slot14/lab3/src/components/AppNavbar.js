import React from "react";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function AppNavbar({ search, setSearch }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Student Manager
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mx-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              style={({ isActive }) => ({
                color: isActive ? "orange" : "gray",
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/students"
              style={({ isActive }) => ({
                color: isActive ? "orange" : "gray",
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              Students
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              style={({ isActive }) => ({
                color: isActive ? "orange" : "gray",
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/profile"
              style={({ isActive }) => ({
                color: isActive ? "orange" : "gray",
                fontWeight: isActive ? "bold" : "normal",
                textDecoration: isActive ? "underline" : "none",
              })}
            >
              Build your Profile
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Quick search"
              aria-label="Quick search"
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
