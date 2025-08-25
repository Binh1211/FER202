import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#222", // giữ nền đen
        color: "#fff",
        padding: "2rem 0",
        fontWeight: "500",
      }}
    >
      <Container>
        <Row>
          <Col md={6} className="mb-0">
            <h5>ShoppeFake</h5>
            <p>
              ShoppeFake là nơi cung cấp các sản phẩm chất lượng với giá tốt
              nhất cho khách hàng.
            </p>
          </Col>

          <Col md={6} className="mb-0">
            <h5>Liên hệ</h5>
            <p>Email: support@shoppfake.com</p>
            <p>Phone: +84 123 456 789</p>
            <p>Địa chỉ: 123 Đường ABC, TP. Đà Nẵng</p>
          </Col>
        </Row>
        <hr style={{ borderColor: "#444" }} />
        <Row>
          <Col className="text-center">
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} ShoppeFake. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
