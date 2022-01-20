import React, { useState, useEffect } from "react";

import { NewParchment } from "../modules/Parchment.js";
import RandomBottles from "../modules/RandomBottles.js";

const TwoBtns = (props) => {
  const [newBottle, setnewBottle] = useState(null);

  const addNewBottles = (obj) => {
    setnewBottle(obj);
  };

  const clearNewBottle = (obj) => {
    setnewBottle(null);
  };

  return (
    <div className="Home-btns">
      <RandomBottles userId={props.userId} clearNewBottle={clearNewBottle} newBottle={newBottle} />
      <NewParchment userId={props.userId} addNewBottles={addNewBottles} />
    </div>
  );
};

export default TwoBtns;
