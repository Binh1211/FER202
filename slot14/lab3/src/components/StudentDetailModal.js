import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

function StudentDetailModal({ show, onHide, student }) {
  if (!student) return null;
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Img
            variant="top"
            src={student.avatar || "/images/students/default.png"}
          />
          <Card.Body>
            <Card.Title>{student.name}</Card.Title>
            <Card.Text>Email: {student.email}</Card.Text>
            <Card.Text>Age: {student.age}</Card.Text>
            <Card.Text>ID: {student.id}</Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StudentDetailModal;
