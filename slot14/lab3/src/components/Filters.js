import React from "react";
import { Row, Col, Form } from "react-bootstrap";

function Filters({ ageFilter, setAgeFilter, hasAvatar, setHasAvatar }) {
  return (
    <Row className="mb-3 g-2">
      <Col md={6}>
        <Form.Select
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
        >
          <option value="">All ages</option>
          <option value="<=20">≤ 20</option>
          <option value="21-25">21–25</option>
          <option value=">25">&gt; 25</option>
        </Form.Select>
      </Col>
      <Col md={6} className="d-flex align-items-center">
        <Form.Check
          type="checkbox"
          label="Has avatar"
          checked={hasAvatar}
          onChange={(e) => setHasAvatar(e.target.checked)}
        />
      </Col>
    </Row>
  );
}

export default Filters;
