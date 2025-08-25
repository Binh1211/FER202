// src/pages/DetailProduct.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Badge, Spinner, Row, Col } from "react-bootstrap";
import { Heart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { ToastContext } from "../context/ToastContext";
import productApi from "../api/productApi";

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { addToCart } = useContext(CartContext);
  const { user, addToWishlist, removeFromWishlist } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // thêm loading

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productApi.getById(id);
        setProduct(data?.data);
      } catch (err) {
        console.error("Lấy sản phẩm thất bại:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!product)
    return <div className="text-center mt-5">Sản phẩm không tồn tại</div>;

  const isFavourite = user?.wishlist?.includes(product.id);

  const handleWishlist = async () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      showToast("Vui lòng đăng nhập để sử dụng tính năng này", "warning");
      return;
    }
    if (isFavourite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
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
    <div className="container my-5">
      <Card className="p-4 shadow-sm position-relative">
        {/* Heart Icon */}
        <Heart
          size={30}
          fill={isFavourite ? "currentColor" : "none"}
          className="text-danger"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        />

        {/* Badges */}
        {product.tags?.includes("sale") && (
          <Badge
            bg="warning"
            text="dark"
            style={{ position: "absolute", top: "10px", left: "10px" }}
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
              left: product.tags.includes("sale") ? "70px" : "10px",
            }}
          >
            HOT
          </Badge>
        )}

        <Row className="align-items-center">
          <Col md={6} className="text-center mb-3 mb-md-0">
            <Card.Img
              src={product.image}
              alt={product.title}
              style={{ height: "500px", objectFit: "contain" }}
            />
          </Col>

          <Col md={6}>
            <Card.Body className="d-flex flex-column align-items-start">
              <Card.Title style={{ fontSize: "1.5rem" }}>
                {product.title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {product.name}
              </Card.Subtitle>
              <Card.Text className="mb-3">{product.description}</Card.Text>

              <Card.Text className="mb-3">
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

              <div className="d-flex flex-column flex-sm-row gap-2 mt-2">
                <Button variant="primary" onClick={() => handleAddToCart()}>
                  Add to Cart
                </Button>
                <Button
                  variant={isFavourite ? "warning" : "danger"}
                  onClick={handleWishlist}
                >
                  {isFavourite ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Back
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DetailProduct;
