import React, { useState, useEffect } from "react";
import { ListGroup, Button, Row, Col, Form, Image } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + Number(cur.price) * cur.qty, 0));
  }, [cart]);

  return (
    <>
      <div className="home">
        <div className="product-container">
          <ListGroup>
            {cart.map((product, i) => {
              return (
                <>
                  <ListGroup.Item
                    key={product.id}
                    style={{
                      marginBottom: "25px",
                      verticalAlign: "middle",
                    }}
                  >
                    <Row>
                      <Col md={2}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col
                        md={2}
                        style={{
                          marginTop: "5px",
                          fontweight: "500",
                        }}
                        className="product-title"
                      >
                        {product.name}
                      </Col>
                      <Col md={2} className="product-price">
                        ₹ {product.price}
                      </Col>
                      <Col
                        md={2}
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        <Rating rating={product.ratings} />
                      </Col>
                      <Col md={2} className="cart-rating">
                        <span
                          style={{
                            fontSize: "20px",
                            color: "magenta",
                          }}
                        >
                          Qty :
                        </span>
                        <Form.Control
                          style={{
                            width: "70%",
                            marginLeft: "auto",
                            marginTop: "-33px",
                            color: "magenta",
                          }}
                          as="select"
                          value={product.qty}
                          onChange={(e) => {
                            dispatch({
                              type: "CHANGE_CART_QTY",
                              payload: {
                                id: product.id,
                                qty: e.target.value,
                              },
                            });
                          }}
                        >
                          {[...Array(product.inStock).keys()].map((x) => (
                            <option style={{ outline: "none" }} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          style={{
                            fontWeight: "500",
                            color: "red",
                          }}
                          type="button"
                          variant="light"
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: product,
                            });
                          }}
                        >
                          <AiFillDelete fontsize="20px" /> Delete Item
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </>
              );
            })}
          </ListGroup>
        </div>
        {cart.length > 0 ? (
          <>
            <div className="filters summary">
              <span className="title">SubTotal ({cart.length}) Items</span>
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "20px",
                }}
              >
                Total: ₹ {total}
              </span>
              <Button
                type="button"
                disabled={cart.length === 0 || total < 300}
                style={{
                  marginTop: "10px",
                }}
              >
                {total < 300 ? "Minimum Order ₹ 300" : "Proceed To CheckOut"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="cart-zero">
              Your Cart is Empty !
              <br />
              <button
                className="back-to-home-button"
                onClick={() => {
                  navigate("/");
                }}
              >
                Go To Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
