import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../services/api"; // import axios instance

import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Nếu có redirect trước đó, dùng; nếu không thì về trang chủ
  const redirectUri = location.state?.from || "/products";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // gọi API lấy account theo email
      const res = await api.get(`/accounts?email=${email}`);
      const accounts = res.data;

      if (accounts.length === 0) {
        setError("Email not found!");
        return;
      }

      const account = accounts[0];

      if (account.password !== password) {
        setError("Password is incorrect!");
        return;
      }

      if (!account.isActive) {
        setError("Account is deactivated, please contact admin!");
        return;
      }

      login(account);
      setError("");
      navigate(redirectUri);
    } catch (err) {
      console.error(err);
      setError("Login failed!");
    }
  };

  if (user) {
    navigate(redirectUri);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ background: "#f5f6fa", padding: "40px 0", minHeight: "92vh" }}
    >
      <Card style={{ width: "400px" }} className="shadow-lg p-4 rounded-3">
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 d-flex justify-content-center align-items-center"
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
