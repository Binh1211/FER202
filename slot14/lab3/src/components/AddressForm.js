import React from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function AddressForm({ data, errors, onChange, onNext, onPrev }) {
  const isValid = Object.keys(errors).length === 0;

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={data.country}
          onChange={(e) => onChange("country", e.target.value)}
          isInvalid={!!errors.country}
        >
          <option value="">-- Select Country --</option>
          <option value="VN">Vietnam</option>
          <option value="US">United States</option>
          <option value="JP">Japan</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
          <option value="CN">China</option>
          <option value="IN">India</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.country}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={data.city}
          onChange={(e) => onChange("city", e.target.value)}
          isInvalid={!!errors.city}
        />
        <Form.Control.Feedback type="invalid">
          {errors.city}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          value={data.street}
          onChange={(e) => onChange("street", e.target.value)}
          isInvalid={!!errors.street}
        />
        <Form.Control.Feedback type="invalid">
          {errors.street}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onPrev}>
          Previous
        </Button>
        <Button variant="success" onClick={onNext} disabled={!isValid}>
          Finish
        </Button>
      </div>
    </Form>
  );
}

AddressForm.propTypes = {
  data: PropTypes.shape({
    country: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired, // ở đây là "Finish"
  onPrev: PropTypes.func.isRequired,
};

export default AddressForm;
