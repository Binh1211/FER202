import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import productApi from "../api/productApi";

function Carousels() {
  const [hotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    const fetchHotProducts = async () => {
      const res = await productApi.getByTag("hot");
      setHotProducts(res.data);
    };
    fetchHotProducts();
  }, []);

  return (
    <Carousel
      fade
      interval={3000}
      indicators
      controls
      variant="dark"
      pause="hover"
      className="mx-0"
      style={{
        background: "#ffffff",
      }}
    >
      {hotProducts.map((product) => (
        <Carousel.Item className="mb-5 position-relative" key={product.id}>
          <div
            style={{
              maxHeight: "90vh",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#ffffff",
            }}
          >
            <img
              src={product.image}
              className="d-block w-100"
              alt={product.title}
              style={{
                objectFit: "contain",
                height: "60vh",
              }}
            />
          </div>

          {/* Giá góc trên phải */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: "5px 10px",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              zIndex: 10,
            }}
          >
            {product.salePrice ? (
              <>
                <span
                  style={{
                    color: "#f00",
                    fontSize: "1.4rem",
                    verticalAlign: "baseline",
                  }}
                >
                  ${product.salePrice}
                </span>
                {"  "}
                <del
                  style={{
                    color: "#ccc",
                    fontSize: "1rem",
                    verticalAlign: "baseline",
                  }}
                >
                  ${product.price}
                </del>
              </>
            ) : (
              <span>${product.price}</span>
            )}
          </div>

          <Carousel.Caption>
            <h2 className="fw-bold text-warning">{product.title}</h2>
            <p className="fw-bold" style={{ color: "#FF5722" }}>
              {product.description}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carousels;
