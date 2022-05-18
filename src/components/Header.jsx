import React from "react";
import {
  Badge,
  Container,
  Nav,
  Navbar,
  Dropdown,
  Button,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";

const Header = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand
            style={{
              fontSize: "30px",
            }}
          >
            <FaShoppingCart color="white" fontSize="20px" />
            &nbsp;
            <Link to="/">Fake Store</Link>
          </Navbar.Brand>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="20px" />
                <Badge bg="none" style={{ color: "yellow" }}>
                  {cart.length}
                </Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  left: "-235px",
                  minWidth: 320,
                }}
              >
                {cart.length > 0 ? (
                  <>
                    {cart.map((product, i) => (
                      <div>
                        <div className="cartItem" key={product.id}>
                          <img
                            src={product.image}
                            className="cartItemImg"
                            alt={product.name}
                          />
                          <div className="cartItemDetail">
                            <span>{product.name}</span>
                            <br />
                            <span
                              style={{
                                color: "green",
                              }}
                            >
                              Price : ₹ {product.price.split(".")[0]}
                            </span>
                          </div>
                          <div className="cart-delete">
                            <AiFillDelete
                              fontSize="20px"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                dispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: product,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Link className="btn" to="/cart">
                      <Button>Go To Cart</Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
