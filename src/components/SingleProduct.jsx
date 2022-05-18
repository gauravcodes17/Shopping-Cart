import React from "react";
import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import "./Style.css";

const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const discount = Math.ceil((Math.random() + 3) * 150);

  return (
    <>
      <div className="products">
        <Card>
          <Card.Img variant="top" src={product.image} alt={product.name} />
          <Card.Body>
            <Card.Title className="product-title">{product.name}</Card.Title>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span className="product-price">
                Price :&nbsp; ₹ {product.price.split(".")[0]}
                &nbsp; &nbsp;
                <del
                  style={{
                    fontSize: "13px",
                    color: "red",
                  }}
                >
                  ₹ {discount + Number(product.price.split(".")[0])}
                </del>
              </span>
              <p className="product-deliver">
                {product.fastDelivery ? (
                  <span style={{
                    color: "blue"
                  }}>Fast Delivery</span>
                ) : (
                  <span style={{
                    color: "black"
                  }}>4 Days Delivery</span>
                )}
              </p>
              <p className="star">
                <Rating rating={product.ratings} className="star" />
              </p>
            </Card.Subtitle>
            <p className="product-button">
              {cart.some((p) => p.id === product.id) ? (
                <Button
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    });
                  }}
                  style={{ fontSize: "14px" }}
                  variant="danger"
                >
                  Remove From Cart
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: product,
                    });
                  }}
                  style={{ fontSize: "14px" }}
                  disabled={!product.inStock}
                >
                  {!product.inStock ? "Out of Stock" : "Add To Cart"}
                </Button>
              )}
            </p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
