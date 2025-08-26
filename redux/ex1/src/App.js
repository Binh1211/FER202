import React from "react";
import Counter from "./components/Counter";
import { Container, Row, Col } from "react-bootstrap";

export default function App() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Counter App</h1>
          <Counter />
        </Col>
      </Row>
    </Container>
  );
}
