import React, { useState } from "react";
import { persons } from "../person";

export default function FilterAgeSkill() {
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [skill, setSkill] = useState("");

  const filtered = persons.filter(({ age, skills }) => {
    const inAge = (!minAge || age >= minAge) && (!maxAge || age <= maxAge);
    const hasSkill = !skill || skills.includes(skill);
    return inAge && hasSkill;
  });

  const allSkills = [...new Set(persons.reduce((acc, p) => [...acc, ...p.skills], []))];

  return (
    <div>
      <h2>Filter by Age & Skill</h2>
      <div className="row g-2 mb-3">
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Min age"
            onChange={e => setMinAge(Number(e.target.value))}
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Max age"
            onChange={e => setMaxAge(Number(e.target.value))}
          />
        </div>
        <div className="col">
          <select className="form-select" onChange={e => setSkill(e.target.value)}>
            <option value="">All Skills</option>
            {allSkills.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {filtered.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ id, firstName, lastName, skills }) => (
              <tr key={id}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{skills.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-danger">No found.</p>
      )}
    </div>
  );
}
