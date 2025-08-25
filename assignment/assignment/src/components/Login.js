import React, { useState, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const { user, login } = useContext(UserContext);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Nếu có redirect trước đó, dùng; nếu không thì về trang chủ
  const redirectUri = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(identifier, password);
    if (res) {
      setError("");
      navigate(redirectUri); // chuyển về trang trước đó
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
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
          <h3 className="text-center mb-4">Đăng nhập</h3>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="identifier" className="mb-3">
              <Form.Label>Tên đăng nhập hoặc Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập username hoặc email..."
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
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
              Đăng nhập
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span>Chưa có tài khoản? </span>
            <Link to="/register">Đăng ký ngay</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
