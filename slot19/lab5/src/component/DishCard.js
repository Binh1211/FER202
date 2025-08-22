import { Card, Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { FavouriteContext } from "../context/FavouriteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const DishCard = ({ dish, darkMode }) => {
  const { addToCart } = useContext(CartContext);
  const { favouriteItems, addToFavourites } = useContext(FavouriteContext);
  const navigate = useNavigate();

  const isFavourite = favouriteItems?.some((item) => item.id === dish.id);

  return (
    <Card className="h-100 shadow-sm d-flex flex-column">
      <Card.Img
        variant="top"
        src={dish.image}
        alt={dish.name}
        style={{ height: "190px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{dish.name}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> ${parseFloat(dish.price).toFixed(2)}
        </Card.Text>

        <Button
          variant="primary"
          onClick={() => addToCart(dish)}
          className={`my-1 ${darkMode ? "darkMode" : ""}`}
        >
          Add to Cart
        </Button>

        <Button
          variant="primary"
          onClick={() => navigate(`/dishes/${dish.id}`)}
          className={`my-1 ${darkMode ? "darkMode" : ""}`}
        >
          View Details
        </Button>

        {isFavourite ? (
          <Button
            variant="success"
            onClick={() => navigate("/favourites")}
            className={`my-1 ${darkMode ? "darkMode" : ""}`}
          >
            Browse to My Favourites
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={() => addToFavourites(dish)}
            className={`my-1 ${darkMode ? "darkMode" : ""}`}
          >
            Add to Favourite
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default DishCard;
