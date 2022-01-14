import React, { useState } from "react";
import "./Home.css";

import { NewParchment } from "../modules/Parchment.js";
import RandomBottles from "../modules/RandomBottles.js";
import Bukabuka from "../modules/Bukabuka.js";

const Home = (props) => {
  return (
    <div className="Home-container">
      <Bukabuka />
      <div className="Home-btns">
        <RandomBottles userId={props.userId} />
        <NewParchment userId={props.userId} />
      </div>
    </div>
  );
};

export default Home;
