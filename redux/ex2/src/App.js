import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { Container, Row, Col } from "react-bootstrap";

export default function App() {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Shopping Cart App</h1>
      <Row>
        <Col md={6}>
          <ProductList />
        </Col>
        <Col md={6}>
          <Cart />
        </Col>
      </Row>
    </Container>
  );
}
