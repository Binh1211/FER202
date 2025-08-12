import React, { useState } from "react";
import { persons } from "../person";

export default function SearchSortStats() {
  const [search, setSearch] = useState("");

  const filtered = persons
    .filter(({ firstName, lastName }) =>
      (firstName + " " + lastName).toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.isActive !== b.isActive) return b.isActive - a.isActive;
      if (a.age !== b.age) return a.age - b.age;
      return a.lastName.localeCompare(b.lastName);
    });

  const stats = filtered.reduce(
    (acc, { age, isActive }) => {
      acc.total++;
      acc.sumAge += age;
      if (isActive) acc.active++;
      return acc;
    },
    { total: 0, sumAge: 0, active: 0 }
  );

  return (
    <div>
      <h2>Search & Multi-Sort</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(({ id, firstName, lastName, age, isActive }) => (
            <tr key={id}>
              <td>{firstName} {lastName}</td>
              <td>{age}</td>
              <td>{isActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border p-3 mt-3 bg-light">
        <p><b>Total persons:</b> {stats.total}</p>
        <p><b>Average age:</b> {stats.total ? (stats.sumAge / stats.total).toFixed(1) : 0}</p>
        <p><b>Active count:</b> {stats.active}</p>
      </div>
    </div>
  );
}
