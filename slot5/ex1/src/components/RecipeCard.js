import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { Toast } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function RecipeCard({ recipe }) {
  const modalId = `modal-${
    recipe.id || recipe.title.replace(/\s+/g, "-").toLowerCase()
  }`;
  const toastRef = useRef(null);
  const showToast = () => {
    const toastElement = toastRef.current;
    const bsToast = new Toast(toastElement, { delay: 5000 });
    bsToast.show();
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        style={{ objectFit: "cover", height: "200px" }}
        variant="top"
        src={recipe.image}
        alt={recipe.title}
      />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <div className="mb-2">
          <small>Servings: {recipe.servings}</small>
          <br />
          <small>Prep: {recipe.prep} mins</small>
          <br />
          <small>Cook: {recipe.cook} mins</small>
        </div>
        <div className="d-flex justify-content-between">
          <Button
            variant="success"
            data-bs-toggle="modal"
            data-bs-target={`#${modalId}`}
            className="rounded-pill"
          >
            View Recipe
          </Button>
          <Button variant="danger" onClick={showToast} className="rounded-pill">
            Add to Favourite ♡
          </Button>
        </div>
        <div
          className="modal fade"
          id={modalId}
          tabIndex="-1"
          aria-labelledby={`${modalId}-label`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${modalId}-label`}>
                  {recipe.title}
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
                  style={{ objectFit: "cover", height: "200px" }}
                  variant="top"
                  src={recipe.image}
                  alt={recipe.title}
                />
                <p>{recipe.description}</p>
                <ul>
                  <li>Servings: {recipe.servings}</li>
                  <li>Prep time: {recipe.prep} mins</li>
                  <li>Cook time: {recipe.cook} mins</li>
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
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div
            ref={toastRef}
            className="toast rounded-4 text-bg-success"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body">Added to favourites.</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
