import React, { useState } from "react";
import "./Home.css";

import { NewParchment } from "../modules/Parchment.js";
import RandomBottles from "../modules/RandomBottles.js";

const Home = () => {
  return (
    <div className="Home-container">
      <div className="Home-btns">
        <RandomBottles />
        <NewParchment />
      </div>
    </div>
  );
};

export default Home;
