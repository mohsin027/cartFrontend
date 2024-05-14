import React, { useEffect, useState } from "react";
import { RxPerson } from "react-icons/rx";
import { TbArrowsShuffle } from "react-icons/tb";
import { IoHeartOutline } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../constants/constants";

export const Navbar = () => {
  const [cartData, setCartData] = useState(0);
  const { cartRefresh } = useSelector((state) => state.cart);

  const fetchUser = async () => {
    const { data } = await axios.get(SERVER_URL+"/fetchUser");
    console.log(data);
    const cart = data.cart;
    const price = cart.reduce((acc, el) => (acc += el.price), 0);
    console.log(price);
    setCartData(price);
  };
  useEffect(() => {
    fetchUser();
  }, [cartRefresh]);
  return (
    <nav className="nav-div">
      <div className="left">
        <ul>
          <li>
            <div className="category-menu">
              <span>
                <HiOutlineSquares2X2 />
              </span>
              <span>All Categories</span>
            </div>
          </li>
          <li>Deals</li>
          <li>Shop</li>
          <li>Our Contacts</li>
          <li>Stores</li>
        </ul>
      </div>
      <div className="right">
        <div className="profile-icon">
          <span>
            <RxPerson />
          </span>
        </div>
        <div className="profile-icon">
          <span>
            <TbArrowsShuffle />
          </span>
          <p>0</p>
        </div>
        <div className="profile-icon">
          <span>
            <IoHeartOutline />
          </span>
          <p>0</p>
        </div>
        <div className="cart-icon">
          <span>
            <PiShoppingCartSimple />
          </span>
          <p>0</p>
        </div>
        <div className="price-icon">
          <span>₹{cartData.toFixed(2)}</span>
        </div>
      </div>
    </nav>
  );
};
