import { Card, Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ToastContext } from "../context/ToastContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { user, addToWishlist, removeFromWishlist } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useContext(ToastContext);

  const favouriteItems = user?.wishlist || [];
  const isFavourite = favouriteItems.includes(product.id);

  const handleFavouriteInHomePage = () => {
    if (!user) {
      showToast("Vui lòng đăng nhập để sử dụng tính năng này!", "warning");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (isFavourite) {
      navigate("/wishlist");
    } else {
      addToWishlist(product.id);
    }
  };

  const handleFavouriteInFavouritePage = () => {
    if (isFavourite) {
      removeFromWishlist(product.id);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      showToast("Vui lòng đăng nhập để sử dụng tính năng này!", "warning");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    addToCart(product);
  };

  return (
    <Card className="h-100 shadow-sm d-flex flex-column justify-content-between text-center position-relative">
      <Heart
        size={27}
        fill={isFavourite ? "currentColor" : "none"}
        className={`text-danger my-1`}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 10,
        }}
      />
      {product.tags?.includes("sale") && (
        <Badge
          bg="warning"
          text="dark"
          style={{
            position: "absolute",
            top: "10px",
            right: product.tags?.includes("hot") ? "60px" : "10px",
            zIndex: 10,
          }}
        >
          SALE
        </Badge>
      )}
      {product.tags?.includes("hot") && (
        <Badge
          bg="danger"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
          }}
        >
          HOT
        </Badge>
      )}

      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ height: "350px", objectFit: "contain" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: "1.3rem" }}>{product.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.name}
        </Card.Subtitle>

        <Card.Text>
          {product.salePrice ? (
            <span>
              <del
                className="text-secondary me-2"
                style={{ fontSize: "1.2rem" }}
              >
                ${product.price}
              </del>
              <span
                className="fw-bold text-danger"
                style={{ fontSize: "1.5rem" }}
              >
                ${product.salePrice}
              </span>
            </span>
          ) : (
            <span className="fw-bold" style={{ fontSize: "1.5rem" }}>
              ${product.price}
            </span>
          )}
        </Card.Text>

        <Button
          variant="secondary"
          onClick={() => navigate(`/products/${product.id}`)}
          className="my-1"
        >
          View Details
        </Button>
        <Button
          variant="primary"
          onClick={() => handleAddToCart()}
          className="my-1"
        >
          Add to Cart
        </Button>
        {location.pathname === "/wishlist" ? (
          <Button
            variant="danger"
            onClick={handleFavouriteInFavouritePage}
            className="my-1"
          >
            Remove from Wishlist
          </Button>
        ) : (
          <Button
            variant={isFavourite ? "warning" : "danger"}
            onClick={handleFavouriteInHomePage}
            className="my-1"
          >
            {isFavourite ? "View Wishlist" : "Add to Wishlist"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
