import React from "react";
import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import "./Style.css";

const Home = () => {
  const {
    state: { products },
    productState: { byStock, byFastDelivery, byRating, sort, searchQuery },
  } = CartState();

  //console.log(products);

  const transformProduct = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((product) => product.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((product) => product.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((product) => product.ratings >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) => product.name.toLowerCase().includes(searchQuery));
    }

    return sortedProducts;
  };

  return (
    <>
      <div className="home">
        <Filters />
        <div style={{ marginBottom: 0 }}>
          <h2
            style={{
              marginBottom: 0,
              marginTop: "35px",
              textAlign: "center",
              color: "purple",
            }}
          >
            All Products
          </h2>
        </div>
        <div className="product-container" style={{ marginTop: 0 }}>
          {transformProduct().map((product, i) => {
            return <SingleProduct product={product} key={product.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
