import { Button, Form, Container, Modal, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

function ProfileForm({ initialName, initialEmail, initialAge }) {
  const [name, setName] = useState(initialName || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [age, setAge] = useState(initialAge || "");
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleValidation = () => {
    const newErrors = {};
    if (!name || name.trim().length === 0) {
      newErrors.name = "Tên không được để trống!";
    }
    if (!age || isNaN(age) || age < 1) {
      newErrors.age = "Tuổi phải là một số hợp lệ (tối thiểu 1)!";
    }
    if (!email.includes("@")) {
      newErrors.email = "Email không hợp lệ!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "age":
        setAge(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleValidation();
  }, [name, email, age]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMessage("Submitted successfully!");
    setShowToast(true);
    setShowModal(true);
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => setShowToast(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const isFormValid =
    name.trim().length > 0 &&
    email &&
    email.includes("@") &&
    age &&
    !isNaN(age) &&
    Number(age) >= 1;

  return (
    <>
      <Container>
        <h1>Profile Form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAge">
            <Form.Label>Tuổi</Form.Label>
            <Form.Control
              type="text"
              name="age"
              value={age}
              onChange={handleChange}
              isInvalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </Form>
      </Container>

      {showToast && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <div
            className="toast show align-items-center text-bg-primary border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body d-flex justify-content-between align-items-center">
              {toastMessage}
              <button
                type="button"
                className="btn-close btn-close-white ms-2 mb-1"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>Tuổi: {age}</Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ProfileForm.propTypes = {
  initialName: PropTypes.string,
  initialEmail: PropTypes.string,
  initialAge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ProfileForm.defaultProps = {
  initialName: "",
  initialEmail: "",
  initialAge: "",
};

export default ProfileForm;
