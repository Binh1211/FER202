import React from "react";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";

function AppNavbar({ search, setSearch }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand href="/">Student Manager</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/students">Students</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Quick search"
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
