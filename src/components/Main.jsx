import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import ProductCard from "./ProductCard";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgMenuGridO } from "react-icons/cg";
import { SERVER_URL } from "../constants/constants";

export const Main = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await axios.get(SERVER_URL + "/admin");
    setProducts(data);
    console.log("data", data);
  };
  useEffect(() => {
    fetchProducts();
  }, [cart]);

  return (
    <div className="main">
      <Row className="first d-flex justify-content-between ">
        <Col xs={12} lg={6} className="">
          <div>
            <h2>Mobile Accesories</h2>
          </div>
        </Col>
        <Col xs={12} lg={6} className="filter-div">
          <Col md={12} className="filter-by">
            <span>Show :</span>
            <span>9 /</span>
            <span>12 /</span>
            <span>18 /</span>
            <span>24</span>
            <span>
              <RxHamburgerMenu />
            </span>
            <span>
              <CgMenuGridO />
            </span>
          </Col>
          <Col md={12} className="filter-select">
            <select className="select" name="" id="">
              <option className="option" value="sort by popularuty">Sort by popularity</option>
              <option className="option" value="sort by popularuty">Sort by popularity</option>
            </select>
          </Col>
        </Col>
      </Row>
      <Row className="card-row">
        {products.length <= 0 ? (
          <Col className="cards col-sm-12 d-flex flex-column justify-content-center align-items-center">
            <div>

            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>

            <div className="">Fetching products....</div>
          </Col>
        ) : (
          products.map((product) => (
            <Col
              sm={6}
              md={6}
              lg={4}
              key={product._id}
              className="cards col-xl-3"
            >
              <ProductCard product={product} cart={cart} setCart={setCart} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};
