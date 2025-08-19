import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function AboutForm({ data, errors, onChange, onNext, disabledNext }) {
  return (
    <Form>
      <Row className="mb-3">
        <Col md={6} className="d-flex flex-column align-items-center">
          <Form.Group className="mb-3 w-100">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    onChange("avatar", reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Form.Group>
          {data.avatar && (
            <img
              src={data.avatar}
              alt="Avatar preview"
              className="rounded-circle mt-2"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          )}
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={data.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={data.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={onNext} disabled={disabledNext}>
          Next
        </Button>
      </div>
    </Form>
  );
}

AboutForm.propTypes = {
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  disabledNext: PropTypes.bool,
};

export default AboutForm;
