import axios from "axios";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { SERVER_URL } from "../constants/constants";

function ProductCard({ product, cart, setCart }) {
  const star = () => {
    let arr = [];

    for (let i = 0; i < 5; i++) {
      if (i < product.rating) {
        arr.push(
          <span className="star">
            <CiStar />
          </span>
        );
      }
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    star();
  }, []);
  async function addToCart(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        SERVER_URL+"/addToCart",
        product
      );
      console.log(response);
      dispatch({ type: "REFRESH-CART" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="card">
      <div className="offer-circle">
        <span>-50%</span>
      </div>
      <Card.Img
        className="card-img"
        variant="top"
        src={`${product.image?.url}`}
      />
      <Card.Body>
        <Card.Title className="card-title card-body">{product.name}</Card.Title>
        <Card.Text className="card-text card-body">{product.desc}</Card.Text>
        <Card.Text className="card-body">
        {[...Array(5)].map((star, i) => {
          if (i < product.rating) {
            return (
              <span key={i} className="star">
                <FaStar />
              </span>
            );
          } else {
            return (
              <span key={i}>
                <CiStar />
              </span>
            );
          }
        })}
        </Card.Text>
      

        <Card.Text className="card-body">
          <span className='me-2'><strike>₹1099.00</strike></span><span>₹{product.price.toFixed(2)}</span></Card.Text>
        <Button className="cart-button" variant="primary" onClick={addToCart}>
          Add To Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
