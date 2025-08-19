import React, { useState } from "react";
import AppNavbar from "./components/AppNavbar";
import StudentsPage from "./pages/StudentsPage";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <AppNavbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<StudentsPage search={search} />} />
        <Route path="/students" element={<StudentsPage search={search} />} />
        <Route path="/about" element={<StudentsPage search={search} />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
