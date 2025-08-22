import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { theme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isLogin = login(username, password);
    if (isLogin) {
      setError("");
      navigate("/");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div
      className={`App ${theme === "dark" ? "dark-mode" : ""}`}
      style={{ minHeight: "92vh" }}
    >
      <div
        className={`login-container ${theme === "dark" ? "dark-mode" : ""}`}
        style={{ maxWidth: 400, margin: "0px auto", padding: "20px" }}
      >
        <h2>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên đăng nhập:</label>
            <input
              type="text"
              className={`form-control ${theme === "dark" ? "dark-mode" : ""}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu:</label>
            <input
              type="password"
              className={`form-control ${theme === "dark" ? "dark-mode" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          <button
            type="submit"
            className={`btn btn-primary w-100 ${
              theme === "dark" ? "dark-mode" : ""
            }`}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
