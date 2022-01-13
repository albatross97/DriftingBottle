import React, { useState, useEffect } from "react";
import HomeBottle from "./HomeBottle";
import { get } from "../../utilities";

const RandomBottles = (props) => {
  const [randoms, setRandoms] = useState([]);

  const sample = (srcArr, n) => {
    let resultArr = [];
    while (srcArr.length && resultArr.length < n) {
      resultArr = resultArr.concat(
        srcArr.splice(
          // extract one random element
          Math.floor(Math.random() * srcArr.length),
          1
        )
      );
    }
    return resultArr;
  };

  useEffect(() => {
    get("/api/stories").then((storiesObjs) => {
      const newRandoms = sample(storiesObjs, props.size);
      setRandoms(newRandoms);
    });
  }, []);

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);

  };

  const randomStyle = () => {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let margin = 100;
    let randomTop = getRandomNumber(winHeight / 2, winHeight - margin);
    let randomLeft = getRandomNumber(margin, winWidth - margin);
    console.log(randomLeft, randomTop);
    const objStyle = {
      position: "absolute",
      top: randomTop + "px",
      left: randomLeft + "px",
    };
    return objStyle;
  };

  let randomList = null;
  const hasRandom = randoms.length !== 0;

  if (hasRandom) {
    randomList = randoms.map((randomObj) => (
      <HomeBottle
        key={`Bottle_${randomObj._id}`}
        _id={randomObj._id}
        creator_name={randomObj.creator_name}
        creator_id={randomObj.creator_id}
        title={randomObj.title}
        content={randomObj.content}
        tag={randomObj.tag}
        style = {randomStyle()}
      />
    ));
  } else {
    randomList = <div>No bottles!</div>;
  }

  return <div>{randomList}</div>;
};

export default RandomBottles;
