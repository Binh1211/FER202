import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Card, Container, Image } from "react-bootstrap";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) return <p>Bạn chưa đăng nhập.</p>;

  return (
    <Container className="d-flex justify-content-center my-5">
      <Card style={{ width: "400px" }} className="shadow-lg p-3 text-center">
        <Card.Header>
          <h3>Trang cá nhân</h3>
        </Card.Header>
        <Card.Body>
          {user.avatar && (
            <Image
              src={user.avatar}
              roundedCircle
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                marginBottom: "15px",
              }}
            />
          )}
          <Card.Title>Thông tin chi tiết</Card.Title>
          <Card.Text className="text-start">
            <strong>Tên:</strong> {user.fullname || user.username} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>Vai trò:</strong> {user.role}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
