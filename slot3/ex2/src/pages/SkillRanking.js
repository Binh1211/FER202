import React from "react";
import { persons } from "../person";

export default function SkillRanking() {
  const skillCount = persons.reduce((acc, person) => {
    person.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const sorted = Object.entries(skillCount).sort((a, b) => b[1] - a[1]);
  const topCount = sorted[0][1];

  return (
    <div>
      <h2>Skill Ranking</h2>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Skill</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(([skill, count]) => (
            <tr key={skill}>
              <td>{skill}</td>
              <td className={count === topCount ? "fw-bold" : ""}>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
