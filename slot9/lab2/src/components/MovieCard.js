import React, { useRef, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Toast } from "bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function MovieCard({ movie }) {
  const toastRef = useRef(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isFav, setIsFav] = useState(() => checkFavourite(movie.id));

  function checkFavourite(id) {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    return favs.some((m) => m.id === id);
  }

  function showToast(message) {
    setToastMessage(message);
    const toastElement = toastRef.current;
    const bsToast = new Toast(toastElement, { delay: 3000 });
    bsToast.show();
  }

  function toggleFavourite() {
    let favs = JSON.parse(localStorage.getItem("favourites")) || [];
    const exists = favs.some((m) => m.id === movie.id);

    if (exists) {
      favs = favs.filter((m) => m.id !== movie.id);
      showToast("Removed from favourites");
    } else {
      favs.push(movie);
      showToast("Added to favourites");
    }

    localStorage.setItem("favourites", JSON.stringify(favs));
    setIsFav(!exists);
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        style={{ objectFit: "cover", height: "600px" }}
        variant="top"
        src={movie.poster}
        alt={movie.title}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <div className="mb-2">
          <Badge bg="info" className="mb-2">
            {movie.genre}
          </Badge>
          <br />
          <small className="text-muted">Duration: {movie.duration} mins</small>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant="success"
            data-bs-toggle="modal"
            data-bs-target={`#${movie.id}`}
            className="rounded-pill"
          >
            View Movie
          </Button>
          <Button
            variant={isFav ? "danger" : "outline-danger"}
            onClick={toggleFavourite}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            {isFav ? <FaHeart /> : <FaRegHeart />}
          </Button>
        </div>

        {/* Modal */}
        <div
          className="modal fade"
          id={movie.id}
          tabIndex="-1"
          aria-labelledby={`${movie.id}-label`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${movie.id}-label`}>
                  {movie.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Card.Img
                  style={{ objectFit: "cover", height: "400px" }}
                  variant="top"
                  src={movie.poster}
                  alt={movie.title}
                />
                <p>{movie.description}</p>
                <ul>
                  <li>Genre: {movie.genre}</li>
                  <li>Year: {movie.year}</li>
                  <li>Country: {movie.country}</li>
                  <li>Duration: {movie.duration} mins</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Start Watching
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            ref={toastRef}
            className="toast rounded-4 text-bg-success"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieCard;
