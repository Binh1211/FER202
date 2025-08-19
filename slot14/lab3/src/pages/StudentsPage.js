import React, { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import { students } from "../data/students";
import Filters from "../components/Filters";
import SortDropdown from "../components/SortDropdown";
import StudentGrid from "../components/StudentGrid";
import StudentDetailModal from "../components/StudentDetailModal";
import Hero from "../components/Hero";
import { Row, Col } from "react-bootstrap";

function StudentsPage({ search }) {
  const [ageFilter, setAgeFilter] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredStudents = useMemo(() => {
    return students
      .filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase())
      )
      .filter((s) => {
        if (ageFilter === "<=20") return s.age <= 20;
        if (ageFilter === "21-25") return s.age >= 21 && s.age <= 25;
        if (ageFilter === ">25") return s.age > 25;
        return true;
      })
      .filter((s) => (hasAvatar ? s.avatar : true));
  }, [search, ageFilter, hasAvatar]);

  const sortedStudents = useMemo(() => {
    let arr = [...filteredStudents];
    switch (sortOption) {
      case "age-asc":
        return arr.sort((a, b) => a.age - b.age);
      case "age-desc":
        return arr.sort((a, b) => b.age - a.age);
      case "name-asc":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return arr.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return arr;
    }
  }, [filteredStudents, sortOption]);

  const handleView = (student) => {
    setSelected(student);
    setShowModal(true);
  };

  return (
    <Container>
      <Hero />
      <Row xs={1} sm={2} className="g-4">
        <Col>
          <Filters
            ageFilter={ageFilter}
            setAgeFilter={setAgeFilter}
            hasAvatar={hasAvatar}
            setHasAvatar={setHasAvatar}
          />
        </Col>
        <Col>
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </Col>
      </Row>

      <StudentGrid students={sortedStudents} onView={handleView} />
      <StudentDetailModal
        show={showModal}
        onHide={() => setShowModal(false)}
        student={selected}
      />
    </Container>
  );
}

export default StudentsPage;
