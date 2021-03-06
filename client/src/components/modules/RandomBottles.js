import React, { useState, useEffect } from "react";
import HomeBottle from "./HomeBottle";
import { get } from "../../utilities";
import "./RandomBottles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

const RandomBottles = (props) => {
  const [stories, setStories] = useState([]);
  const [size, setSize] = useState(3);
  const [render, setRender] = useState(false);

  useEffect(() => {
    get("/api/stories").then((storiesObjs) => {
      setStories(storiesObjs);
    });
  }, []);

  const sample = (srcArr, n) => {
    srcArr = srcArr.slice();
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

  let randoms = sample(stories, size);

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const randomStyle = () => {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let margin = 100;
    let randomTop = getRandomNumber(winHeight / 2, winHeight - margin);
    let randomLeft = getRandomNumber(margin, winWidth - margin - 100);

    const objStyle = {
      position: "absolute",
      top: randomTop + "px",
      left: randomLeft + "px",
    };
    return objStyle;
  };

  const shuffle = () => {
    let size = getRandomNumber(2, 3);
    setSize(size);
    setRender(!render);
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
        style={randomStyle()}
      />
    ));
  } else {
    randomList = <div>No bottles!</div>;
  }

  return (
    <>
      <div className="randomList">{randomList}</div>
      <FontAwesomeIcon icon={faRandom} className="u-icon" onClick={shuffle} />
    </>
  );
};

export default RandomBottles;
