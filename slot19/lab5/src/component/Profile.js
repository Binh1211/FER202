import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Card, Container, Row, Col } from "react-bootstrap";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(require("../context/ThemeContext").ThemeContext);
  if (!user) {
    return (
      <div
        className={`App ${theme === "dark" ? "dark-mode" : ""}`}
        style={{ minHeight: "92vh" }}
      >
        <Container
          className={`pt-5 text-center ${theme === "dark" ? "dark-mode" : ""}`}
        >
          <h3>Bạn chưa đăng nhập.</h3>
          <p>Vui lòng đăng nhập để xem thông tin cá nhân.</p>
        </Container>
      </div>
    );
  }
  return (
    <div
      className={`App ${theme === "dark" ? "dark-mode" : ""}`}
      style={{ minHeight: "92vh" }}
    >
      <Container className={`pt-5 ${theme === "dark" ? "dark-mode" : ""}`}>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card
              className={`text-center p-3 shadow-sm ${
                theme === "dark" ? "dark-mode" : ""
              }`}
            >
              <Card.Img
                variant="top"
                src={user.avatar || "/images/default.jpg"}
                alt={user.username}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  margin: "0 auto",
                }}
              />
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
