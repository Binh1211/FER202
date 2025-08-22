import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import dishes from "../data/dishes"; // import data món ăn
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FavouriteContext } from "../context/FavouriteContext";
import { ThemeContext } from "../context/ThemeContext";

const DishDetail = () => {
  const { id } = useParams();
  const dish = dishes.find((d) => d.id === parseInt(id));
  const { addToCart } = useContext(CartContext);
  const { favouriteItems, addToFavourites } = useContext(FavouriteContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const isFavourite = favouriteItems?.some((item) => item.id === dish.id);

  if (!dish) {
    return <h3 className="text-center mt-4">Không tìm thấy món ăn</h3>;
  }

  return (
    <div className={`App ${theme === "dark" ? "dark-mode" : ""} pb-1`}>
      <Card className="shadow">
        <Card.Img
          variant="top"
          src={dish.image}
          alt={dish.name}
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{dish.name}</Card.Title>
          <Card.Text>{dish.description}</Card.Text>
          <h5>Giá: ${dish.price}</h5>
          <div className="d-flex gap-2">
            <Button variant="success" onClick={() => addToCart(dish)}>
              Thêm vào giỏ
            </Button>
            {isFavourite ? (
              <Button
                variant="success"
                onClick={() => navigate("/favourites")}
                className={`${theme === "dark" ? "darkMode" : ""}`}
              >
                Browse to My Favourites
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={() => addToFavourites(dish)}
                className={`${theme === "dark" ? "darkMode" : ""}`}
              >
                Add to Favourite
              </Button>
            )}
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Quay lại
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DishDetail;
