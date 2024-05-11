import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgMenuGridO } from "react-icons/cg";

export const Main = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/admin");
    setProducts(data);
    console.log("data", data);
  };
  useEffect(() => {
    fetchProducts();
  }, [cart]);

  return (
    <div className="main">
      <Row className="first">
        <Col className="d-flex justify-content-between ">
          <div>
            <h2>Mobile Accesories</h2>
          </div>
          <div className="filter-div  ">
            <sapn>Show : 9 /</sapn>
            <sapn>12 /</sapn>
            <sapn>18 /</sapn>
            <sapn>24</sapn>
            {/* <sapn>Show : 9 / 12 / 18 / 24</sapn> */}

            <span>
              <RxHamburgerMenu />
            </span>
            <span>
              <CgMenuGridO />
            </span>
            <select name="" id="">
              <option value="sort by popularuty">sort by popularuty</option>
            </select>
          </div>
        </Col>
      </Row>
      <Row className="card-row ">
        {products.map((product) => (
          <Col md={3} key={product._id} className="cards">
            <ProductCard product={product} cart={cart} setCart={setCart} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
