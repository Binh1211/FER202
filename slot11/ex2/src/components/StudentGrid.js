import React from "react";
import { Row, Col } from "react-bootstrap";
import StudentCard from "./StudentCard";

function StudentGrid({ students, onView }) {
  return (
    <Row xs={1} sm={2} md={3} className="g-4">
      {students.map((st) => (
        <Col key={st.id}>
          <StudentCard student={st} onView={onView} />
        </Col>
      ))}
    </Row>
  );
}

export default StudentGrid;
