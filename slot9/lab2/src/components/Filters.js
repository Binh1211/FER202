import React from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

function Filters({ search, setSearch, sortOption, setSortOption, genre, setGenre, genres }) {
  return (
    <Row className="mb-4 g-2">
      {/* Lọc theo Genre */}
      <Col md={3}>
        <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="All">All Genres</option>
          {genres.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
        </Form.Select>
      </Col>

      {/* Tìm kiếm */}
      <Col md={4}>
        <InputGroup>
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Col>

      {/* Sắp xếp */}
      <Col md={3}>
        <Form.Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="none">Sort by Duration: None</option>
          <option value="duration-asc">Duration ↑</option>
          <option value="duration-desc">Duration ↓</option>
          <option value="title-asc">Title A → Z</option>
          <option value="title-desc">Title Z → A</option>
        </Form.Select>
      </Col>
    </Row>
  );
}

export default Filters;
