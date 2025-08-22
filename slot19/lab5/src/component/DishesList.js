import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import DishCard from "./DishCard";

const DishesList = ({ dishes, darkMode }) => {
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Danh sách món ăn</h2>
      <Row className="g-4">
        {dishes.map((dish) => (
          <Col key={dish.id} xs={12} sm={6} md={3}>
            <DishCard dish={dish} darkMode={darkMode} />
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
