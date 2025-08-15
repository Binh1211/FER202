import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import CarouselMovie from "./components/CarouselMovie";
import MovieGrid from "./components/MovieGrid";
import MovieRequestForm from "./components/Form";
import MyFavourites from "./components/MyFavourite";
import Filters from "./components/Filters";
import { movies } from "./components/movies";

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sortOption, setSortOption] = useState("none");

  // Lấy danh sách genres duy nhất
  const genres = Array.from(new Set(movies.map((m) => m.genre)));

  // Lọc
  const filteredMovies = movies.filter((movie) => {
    const keyword = search.toLowerCase();
    const matchesSearch =
      movie.title.toLowerCase().includes(keyword) ||
      movie.description.toLowerCase().includes(keyword);
    const matchesGenre = genre === "All" || movie.genre === genre;
    return matchesSearch && matchesGenre;
  });

  // Sắp xếp
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortOption) {
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      case "duration-asc":
        return a.duration - b.duration;
      case "duration-desc":
        return b.duration - a.duration;
      default:
        return 0;
    }
  });

  return (
    <Routes>
      <Route
        path="/favourites"
        element={
          <>
            <AppNavbar />
            <div className="container my-4">
              <MyFavourites />
            </div>
            <Footer />
          </>
        }
      />
      <Route
        path="/form"
        element={
          <>
            <AppNavbar />
            <div className="container my-4">
              <MovieRequestForm />
            </div>
            <Footer />
          </>
        }
      />
      <Route
        path="/"
        element={
          <>
            <AppNavbar />
            <CarouselMovie />
            <div className="container my-4">
              <Filters
                search={search}
                setSearch={setSearch}
                sortOption={sortOption}
                setSortOption={setSortOption}
                genre={genre}
                setGenre={setGenre}
                genres={genres}
              />
              {sortedMovies.length > 0 ? (
                <MovieGrid movies={sortedMovies} />
              ) : (
                <div className="alert alert-warning text-center">
                  No movies found
                </div>
              )}
            </div>
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default App;
