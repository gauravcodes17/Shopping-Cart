import React from "react";
import { Form, Button, FormControl, Navbar } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Filters = () => {
  const {
    productState: { byStock, byFastDelivery, byRating, sort, searchQuery },
    productDispatch,
  } = CartState();

  //console.log(byStock, byFastDelivery, byRating, sort, searchQuery);

  return (
    <>
      <div className="filters">
        <Navbar.Text className="search">
          <FormControl
            style={{ width: "100%" }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value
              })
            }}
          />
        </Navbar.Text>
        <p className="title" style={{ marginTop: "10px" }}>Filter Products</p>
        <div className="section">
          <span>
            <Form.Check
              inline
              label="Price Asc"
              name="group1"
              type="radio"
              id={`inline-1`}
              onChange={() => {
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowToHigh",
                });
              }}
              checked={sort === "lowToHigh" ? true : false}
            />
          </span>
          <span>
            <Form.Check
              inline
              label="Price Desc"
              name="group1"
              type="radio"
              id={`inline-2`}
              onChange={() => {
                productDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highToLow",
                });
              }}
              checked={sort === "highToLow" ? true : false}
            />
          </span>
          <span>
            <Form.Check
              inline
              label="Include Out of Stock"
              name="group1"
              type="checkbox"
              id={`inline-3`}
              onChange={() => {
                productDispatch({
                  type: "FILTER_BY_STOCK",
                });
              }}
              checked={byStock}
            />
          </span>
          <span>
            <Form.Check
              inline
              label="Fast Delivery Only"
              name="group1"
              type="checkbox"
              id={`inline-4`}
              onChange={() => {
                productDispatch({
                  type: "FILTER_BY_DELIVERY",
                });
              }}
              checked={byFastDelivery}
            />
          </span>
          <span>
            <label style={{ paddingRight: 10 }}>Rating : </label>
            <Rating
              rating={byRating}
              onClick={(i) => {
                productDispatch({
                  type: "FILTER_BY_RATING",
                  payload: i + 1,
                });
              }}
              style={{ cursor: "pointer" }}
            />
          </span>
        </div>
        <Button
          className="clear-button"
          variant="light"
          onClick={() => {
            productDispatch({
              type: "CLEAR_FILTERS",
            });
          }}
        >
          Clear Filters
        </Button>
      </div>
    </>
  );
};

export default Filters;
