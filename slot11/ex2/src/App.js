import React, { useState } from "react";
import AppNavbar from "./components/AppNavbar";
import StudentsPage from "./pages/StudentsPage";
import Footer from "./components/Footer";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <AppNavbar search={search} setSearch={setSearch} />
      <StudentsPage search={search} />
      <Footer />
    </>
  );
}

export default App;
