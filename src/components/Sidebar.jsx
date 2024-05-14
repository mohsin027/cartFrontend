import React, { useState } from "react";
import { Button } from "react-bootstrap";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";

export const Sidebar = () => {
  const [min,setMin]=useState(399)
  const [max,setMax]=useState(11100)
  return (
    <div className="sidebar">
      <ul>
        <li>Product Categories</li>
        <li>Extension</li>
        <li>Mobile Phone Cases</li>
        <li>Power Banks</li>
        <li>Headsets</li>
        <li>Charger and Data Cable</li>
      </ul>
      <hr className="line" />
      <div className="filter">
        <h5>Filter by Price</h5>
        <div className="input-div">
          <input type="number" placeholder={min} className="input" disabled/>
          <input type="number" placeholder={max} className="input" disabled/>
        </div>
        <div className="slider-div">
        

          <MultiRangeSlider
      min={0} setMin={setMin} setMax={setMax}
      max={11000}
      onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
    />
        </div>
        <div className="button-div">
          <Button className="reset-btn" variant="outline-dark">
            Reset
          </Button>
          <Button className="apply-btn" variant="primary">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
