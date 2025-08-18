import React from "react";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function StudentCard({ student, onView }) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={student.avatar || "/images/students/default.jpg"}
        alt={student.name}
        style={{ objectFit: "cover", height: "350px" }}
      />
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>Email: {student.email}</Card.Text>
        <Card.Text>Age: {student.age}</Card.Text>
        <Button variant="primary" onClick={() => onView(student)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }),
  onView: PropTypes.func.isRequired,
};

export default StudentCard;
