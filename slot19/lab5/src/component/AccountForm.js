import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AccountForm({ data, errors, onChange, onNext, onPrev, disabledNext }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form>
      {/* Username */}
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={data.username}
          onChange={(e) => onChange("username", e.target.value)}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid" className="d-block">
          {errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <div className="d-flex">
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={(e) => onChange("password", e.target.value)}
            isInvalid={!!errors.password}
          />
        </div>
        <Form.Control.Feedback type="invalid" className="d-block">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type={showPassword ? "text" : "password"}
          value={data.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type="invalid" className="d-block">
          {errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Secret Question */}
      <Form.Group className="mb-3">
        <Form.Label>Secret Question</Form.Label>
        <Form.Select
          value={data.secretQuestion}
          onChange={(e) => onChange("secretQuestion", e.target.value)}
          isInvalid={!!errors.secretQuestion}
        >
          <option value="">-- Select a question --</option>
          <option value="pet">What is your first pet’s name?</option>
          <option value="mother">What is your mother’s maiden name?</option>
          <option value="city">In which city were you born?</option>
          <option value="teacher">Who was your favorite teacher?</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid" className="d-block">
          {errors.secretQuestion}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Answer */}
      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={data.answer}
          onChange={(e) => onChange("answer", e.target.value)}
          isInvalid={!!errors.answer}
        />
        <Form.Control.Feedback type="invalid" className="d-block">
          {errors.answer}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Buttons */}
      <div className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onPrev}>
          Previous
        </Button>
        <Button variant="primary" onClick={onNext} disabled={disabledNext}>
          Next
        </Button>
      </div>
    </Form>
  );
}

export default AccountForm;
