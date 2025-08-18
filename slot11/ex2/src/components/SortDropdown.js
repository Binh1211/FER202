import React from "react";
import { Form } from "react-bootstrap";

function SortDropdown({ sortOption, setSortOption }) {
  return (
    <Form.Select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="mb-3"
    >
      <option value="">Sort by...</option>
      <option value="age-asc">Age ↑</option>
      <option value="age-desc">Age ↓</option>
      <option value="name-asc">Name A→Z</option>
      <option value="name-desc">Name Z→A</option>
    </Form.Select>
  );
}

export default SortDropdown;
