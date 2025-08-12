import React, { useState } from "react";
import { persons } from "../person";

export default function SortFirstName() {
  const [data, setData] = useState(persons);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = () => {
    const sorted = [...data].sort((a, b) => {
      if (a.firstName < b.firstName) return sortAsc ? -1 : 1;
      if (a.firstName > b.firstName) return sortAsc ? 1 : -1;
      return 0;
    });
    setData(sorted);
    setSortAsc(!sortAsc);
  };

  return (
    <div>
      <h2>Sort First Name</h2>
      <button className="btn btn-primary mb-3" onClick={handleSort}>
        Sort {sortAsc ? "A→Z" : "Z→A"}
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, firstName, lastName, age, city, skills }) => (
            <tr key={id}>
              <td>{firstName} {lastName}</td>
              <td>{age}</td>
              <td>{city}</td>
              <td>{skills.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
