import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { allGenres } from "./movies"; // import danh sách genre

function MovieRequestForm() {
  const [formData, setFormData] = useState({
    requesterName: "",
    email: "",
    title: "",
    genre: "",
    year: "",
    duration: "", // thêm trường Duration
    notes: "",
  });

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      console.log("Movie Request Submitted:", formData);
      navigate("/");
    }
    setValidated(true);
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-primary">Movie Request Form</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/* Name + Email */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="requesterName"
                value={formData.requesterName}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Movie Title + Genre */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movie title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter movie title.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formGenre">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                {allGenres
                  .filter((g) => g !== "All")
                  .map((g, idx) => (
                    <option key={idx} value={g}>
                      {g}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a genre.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Year */}
        <Form.Group className="mb-3" controlId="formYear">
          <Form.Label>Release Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g. 2024"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max="2100"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid year.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Duration */}
        <Form.Group className="mb-3" controlId="formDuration">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            placeholder="e.g. 120"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            max="600"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid duration (in minutes).
          </Form.Control.Feedback>
        </Form.Group>

        {/* Notes */}
        <Form.Group className="mb-3" controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Add any extra details about the movie..."
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="d-flex align-items-center"
        >
          <FaPaperPlane className="me-2" /> Submit Request
        </Button>
      </Form>
    </Container>
  );
}

export default MovieRequestForm;
