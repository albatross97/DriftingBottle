import React, { useState } from "react";
import "./Home.css";
import Bukabuka from "../modules/Bukabuka.js";
import TwoBtns from "../modules/TwoBtns";

const Home = ({ userId }) => {
  return (
    <div className="Home-container">
      <Bukabuka />
      <TwoBtns userId={userId} />
    </div>
  );
};

export default Home;
