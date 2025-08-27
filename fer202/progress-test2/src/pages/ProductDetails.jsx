import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import api from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Spinner className="mt-5" animation="border" />;

  if (!product) return <h3 className="text-center mt-5">Not found!</h3>;

  return (
    <div className="container mt-5">
      <Card className="shadow-lg p-3">
        <div className="row g-0">
          <div className="col-md-5 text-center">
            <Card.Img
              src={`/${product.image}`}
              style={{ maxHeight: 350, objectFit: "contain" }}
            />
          </div>
          <div className="col-md-7">
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <h4 className="text-danger">${product.price}</h4>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <div className="d-flex gap-2 mt-3">
                <Button variant="success">Add to cart</Button>
                <Link to="/products" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
