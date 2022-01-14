import React, { useState } from "react";
import "./Home.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faRandom } from "@fortawesome/free-solid-svg-icons";
import { NewParchment } from "../modules/Parchment.js";
import RandomBottles from "../modules/RandomBottles.js";

const Home = () => {
  const [seen, setSeen] = useState(false);
  const [size, setSize] = useState(3);
  const [flag, setFlag] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  };

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const shuffle = () => {
    let size = getRandomNumber(2, 3);
    setSize(size);
    setFlag(!flag);
  };

  return (
    <div className="Home-container">
      {seen && <NewParchment handleClose={togglePop} />}
      <RandomBottles size={size} rerender={flag} />
      <div className="Home-btns">
        <FontAwesomeIcon icon={faPlusCircle} className="font" onClick={togglePop} />
        <FontAwesomeIcon icon={faRandom} className="font" onClick={shuffle} />
      </div>
    </div>
  );
};

export default Home;
