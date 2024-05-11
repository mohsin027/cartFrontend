import React, { useEffect, useState } from "react";
import { RxPerson } from "react-icons/rx";
import { TbArrowsShuffle } from "react-icons/tb";
import { IoHeartOutline } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { MdWindow } from "react-icons/md";
import axios from "axios";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [cartData,setCartData]=useState(0)
  const { cartRefresh } = useSelector((state) => state.cart);

  const fetchUser =async()=>{
    const {data}=await axios.get("http://localhost:5000/fetchUser")
    console.log(data);
    const cart=data.cart
    const price=cart.reduce((acc,el)=>acc+=el.price,0)
    console.log(price);
    setCartData(price)
  }
  useEffect(()=>{
fetchUser();
  },[cartRefresh])
  return (
    <nav className="nav-div">
      <div className="left">
        <ul>
          <li>
         <div className="category-menu">
         <span>
              <MdWindow />
            </span>
            <span>

            All Categories
            </span>
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
        </div>
        <div className="profile-icon">
          <span>
            <IoHeartOutline />
          </span>
        </div>
        <div className="cart-icon">
          <span>
            <PiShoppingCartSimple />
          </span>
        </div>
        <div className="price-icon">
          <span>₹{cartData}</span>
        </div>
      </div>
    </nav>
  );
};
