import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [searchClick, setSearchClick] = useState("");
  const [sortType, setSortType] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleSearch = () => {
    setSearchClick(searchTerm.trim());
  };

  const filteredCompanies = companies
    .filter((c) =>
      searchClick
        ? c.name.toLowerCase().includes(searchClick.toLowerCase())
        : true
    )
    .filter((c) => (categoryFilter ? c.category === categoryFilter : true))
    .sort((a, b) => {
      if (sortType === "startAsc") return a.start - b.start;
      if (sortType === "startDesc") return b.start - a.start;
      if (sortType === "duration") return b.end - b.start - (a.end - a.start);
      return 0;
    });
  return (
    <div className="App">
      <div style={{ padding: "20px" }}>
        <h1>Company List</h1>
          <div style={{ marginBottom: "10px" , gap: "10px", display: "flex", justifyContent: "center" }}>
            <input
            type="text"
            placeholder="Search company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort by...</option>
            <option value="startAsc">Start Year ↑</option>
            <option value="startDesc">Start Year ↓</option>
            <option value="duration">By Duration</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
            <option value="Auto">Auto</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        {filteredCompanies.length > 0 ? (
          <table style={{marginInline: "auto", textAlign: "left", borderCollapse: "collapse"}} border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }}>
                  <td>{company.name}</td>
                  <td>{company.category}</td>
                  <td>{company.start}</td>
                  <td>{company.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No result</p>
        )}
      </div>
      ;
    </div>
  );
}

export default App;
