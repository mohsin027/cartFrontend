import React from "react";
import { Button } from "react-bootstrap";

export const Sidebar = () => {
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
          <input type="number" placeholder="399" className="input" />
          <input type="number" placeholder="399" className="input" />
         
        </div>
        <div>
        <input
            type="range"
            min="0"
            max="10"
            // value=""
            // oninput="this.parentNode.style.setProperty('--value-b',this.value); this.parentNode.style.setProperty('--text-value-b', JSON.stringify(this.value))"
          ></input>
          <section className="range-slider">
            <span className="rangeValues"></span>
            {/* <input value="5" min="0" max="15" step="0.5" type="range" /> */}
          </section>
        </div>
        <div className="button-div">
          <Button className="reset-btn" variant="outline-dark">Reset</Button>
          <Button className="apply-btn" variant="primary">Apply</Button>
        </div>
      </div>
    </div>
  );
};
