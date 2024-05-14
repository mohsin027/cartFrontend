import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgMenuGridO } from "react-icons/cg";
import { SERVER_URL } from "../constants/constants";

export const Main = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await axios.get(SERVER_URL+"/admin");
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
            <span>Show :</span>
            <span>9 /</span>
            <span>12 /</span>
            <span>18 /</span>
            <span>24</span>
            {/* <sapn>Show : 9 / 12 / 18 / 24</sapn> */}
            <span>
              <RxHamburgerMenu />
            </span>
            <span>
              <CgMenuGridO />
            </span>
            <select name="" id="">
              <option value="sort by popularuty">Sort by popularity</option>
            </select>
          </div>
        </Col>
      </Row>
      <Row className="card-row ">
        {products.map((product) => (
          
          <Col sm={6} md={6} lg={4}  key={product._id} className="cards col-xl-3" >
            <ProductCard product={product} cart={cart} setCart={setCart} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
