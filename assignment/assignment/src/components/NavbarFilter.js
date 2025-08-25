import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const NavbarFilter = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange((prev) => {
      if (type === "checkbox") {
        return { ...prev, [name]: checked };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange((prev) => ({ ...prev, search: value }));
  };

  return (
    <div className="d-flex gap-3 align-items-center justify-content-center p-2">
      {/* Search */}
      <InputGroup style={{ maxWidth: "250px" }}>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>

      {/* Brand filter */}
      <Form.Select
        name="brand"
        onChange={handleChange}
        style={{ maxWidth: "150px", cursor: "pointer" }}
      >
        <option value="">All Brands</option>
        <option value="Apple">Apple</option>
        <option value="Samsung">Samsung</option>
        <option value="Xiaomi">Xiaomi</option>
        <option value="Oppo">Oppo</option>
        <option value="Vivo">Vivo</option>
        <option value="Google">Google</option>
        <option value="OnePlus">OnePlus</option>
      </Form.Select>

      {/* Price filter */}
      <Form.Select
        name="priceRange"
        onChange={handleChange}
        style={{ maxWidth: "150px", cursor: "pointer" }}
      >
        <option value="">All Prices</option>
        <option value="0-500">Under $500</option>
        <option value="500-1000">$500 - $1000</option>
        <option value="1000-2000">$1000+</option>
      </Form.Select>

      <Form.Check
        type="checkbox"
        label="Hot"
        name="hot"
        onChange={handleChange}
        style={{ cursor: "pointer" }}
      />
      <Form.Check
        type="checkbox"
        label="Sale"
        name="sale"
        onChange={handleChange}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default NavbarFilter;
