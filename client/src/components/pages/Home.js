import React, { useState } from "react";
import "./Home.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faRandom } from "@fortawesome/free-solid-svg-icons";
import { NewParchment } from "../modules/Parchment.js";
import RandomBottles from "../modules/RandomBottles.js";

const Home = () => {
  const [seen, setSeen] = useState(false);
  const [bottles, setBottles] = useState([]);
  const togglePop = () => {
    setSeen(!seen);
  };

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const randomObj = (index) => {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let margin = 100;
    let randomTop = getRandomNumber(winHeight / 2, winHeight - margin);
    let randomLeft = getRandomNumber(margin, winWidth - margin);
    const objStyle = {
      position: "absolute",
      top: randomTop + "px",
      left: randomLeft + "px",
    };
    console.log(randomTop, randomLeft);
    return (
      <button key={index} style={objStyle}>
        hello
      </button>
    );
  };

  const shuffle = () => {
    let bottles_copy = bottles.map((x) => x);
    bottles_copy.splice(0, bottles.length);
    [1, 2, 3].forEach((index) => {
      bottles_copy.push(randomObj(index));
    });
    setBottles(bottles_copy);
  };

  return (
    <div className="Home-container">
      <div className="NavBar-add">{seen && <NewParchment handleClose={togglePop} />}</div>
      {bottles}
      <RandomBottles size={2} />
      <div className="Home-btns">
        <FontAwesomeIcon icon={faPlusCircle} className="font" onClick={togglePop} />
        <FontAwesomeIcon icon={faRandom} className="font" onClick={shuffle} />
      </div>
    </div>
  );
};

export default Home;
