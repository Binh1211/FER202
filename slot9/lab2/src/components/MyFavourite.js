import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";

function MyFavourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
  }, []);

  return (
    <Container className="my-4">
      <h2 className="mb-4">My Favourite Movies</h2>
      {favourites.length === 0 ? (
        <p>You have no favourite movies yet.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {favourites.map((movie) => (
            <Col key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default MyFavourites;
