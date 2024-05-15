import React, { useEffect, useState } from "react";
import { RxPerson } from "react-icons/rx";
import { TbArrowsShuffle } from "react-icons/tb";
import { IoHeartOutline } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../constants/constants";
import { IoMdClose, IoMdMenu } from "react-icons/io";



export const NavBar = () => {
  const [cartData, setCartData] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);
  const { cartRefresh } = useSelector((state) => state.cart);
  const expand = "md";

  const fetchUser = async () => {
    const { data } = await axios.get(SERVER_URL + "/fetchUser");
    console.log(data);
    const cart = data.cart;
    const price = cart.reduce((acc, el) => (acc += el.price), 0);
    const count = cart.length;
    console.log(price);
    setCartData(price);
    setCartCount(count);
  };
  useEffect(() => {
    fetchUser();
  }, [cartRefresh]);

  const handleClick = () => {
    document.getElementById("1").classList.add("nav-active");
    setOpen(true);
  };
  const handleClose = () => {
    document.getElementById("1").classList.remove("nav-active");
    setOpen(false);
  };
  return (
 
    <>
      <div onClick={handleClose} id="1" className="responsive-nav">
        <ul className="r-nav pt-5 ">
          <li>Deals</li>
          <li>Shop</li>
          <li>Our Contacts</li>
          <li>Stores</li>
        </ul>
      </div>
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
            <p>{cartCount}</p>
          </div>
          <div className="price-icon">
            <span>₹{cartData.toFixed(2)}</span>
          </div>
        </div>
        {open ? (
          <div className="responsive-menu">
            <span className="menu-btn" onClick={handleClose}>
            <IoMdClose />

            </span>
          </div>
        ) : (
          <div className="responsive-menu">
            <span className="menu-btn" onClick={handleClick}>
            <IoMdMenu />
            </span>
          </div>
        )}
      </nav>
      <div></div>
    </>
  );
};
