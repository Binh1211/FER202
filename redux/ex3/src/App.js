import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import { Container, Row, Col } from "react-bootstrap";

export default function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Auth App</h1>
          {!user ? <LoginForm /> : <UserInfo />}
        </Col>
      </Row>
    </Container>
  );
}
