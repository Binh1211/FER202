import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SortFirstName from "./pages/SortFirstName";
import FilterAgeSkill from "./pages/FilterAgeSkill";
import SkillRanking from "./pages/SkillRanking";
import SearchSortStats from "./pages/SearchSortStats";

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Persons App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/sort">Sort First Name</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/filter">Filter Age & Skill</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ranking">Skill Ranking</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">Search & Stats</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<SortFirstName />} />
          <Route path="/sort" element={<SortFirstName />} />
          <Route path="/filter" element={<FilterAgeSkill />} />
          <Route path="/ranking" element={<SkillRanking />} />
          <Route path="/search" element={<SearchSortStats />} />
        </Routes>
      </div>
    </Router>
  );
}
