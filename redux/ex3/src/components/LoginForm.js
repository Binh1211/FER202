import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authActions";
import { Card, Button, Form } from "react-bootstrap";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username.trim() === "") return;
    dispatch(login(username));
    setUsername(""); // reset input sau khi login
  };

  return (
    <Card className="p-3 shadow-sm">
      <Card.Body>
        <h3 className="mb-3">Đăng nhập</h3>
        <Form.Control
          type="text"
          placeholder="Nhập tên..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3"
        />
        <Button variant="primary" onClick={handleLogin}>
          Đăng nhập
        </Button>
      </Card.Body>
    </Card>
  );
}
