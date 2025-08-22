import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const DishesList = ({ dishes, darkMode }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Danh sách món ăn</h2>
      <Row className="g-4">
        {dishes.map((dish) => (
          <Col key={dish.id} xs={12} sm={6} md={3}>
            <Card className="h-100 shadow-sm d-flex flex-column">
              <Card.Img
                variant="top"
                src={dish.image}
                alt={dish.name}
                style={{ height: "190px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>{dish.description}</Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ${parseFloat(dish.price).toFixed(2)}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => addToCart(dish)}
                  className={`mt-auto ${darkMode ? "darkMode" : ""}`}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;
