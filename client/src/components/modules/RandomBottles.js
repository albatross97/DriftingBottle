import React, { useState, useEffect } from "react";
import HomeBottle from "./HomeBottle";
import { get } from "../../utilities";

import "./RandomBottles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

/**
 * @param {function (min,max)} getRandomNumber: function that returns a random integer between min an max
 * @param {function} randomStyle: function that returns a random position of a bottle
 * @param {function} shuffle: function that resets number of random bottles, and rerender
 * @param {function (stories, size)} sample: function that samples stories of a given size, return an array called randoms
 * @param {array} randomList: contain random bottles of a given size
 **/

const RandomBottles = ({ clearNewBottle, newBottle }) => {
  const [size, setSize] = useState(3);
  const [IsShuffle, setIsShuffle] = useState(false);
  const [randoms, setRandoms] = useState([]);
  const [stories, setStories] = useState([]);

  // init: assign state stories, assign randoms (samples from stories)
  useEffect(() => {
    get("/api/stories").then((storiesObjs) => {
      setStories(storiesObjs);
      const sampledStories = sample(storiesObjs, size);
      sampledStories.forEach((story) => {
        story.style = randomStyle();
      });
      setRandoms(sampledStories);
    });
  }, []);

  // if click shuffle button, reassgin randoms
  useEffect(() => {
    let sampledStories = sample(stories, size);
    sampledStories.forEach((story) => {
      story.style = randomStyle();
    });
    setRandoms(sampledStories);
  }, [IsShuffle]);

  // If drop a new bottle, concat randoms with newBottle
  // clearNewBottle: return props
  useEffect(() => {
    if (newBottle) {
      const newBottle_copy = JSON.parse(JSON.stringify(newBottle));

      [newBottle_copy].forEach((story) => {
        story.style = randomStyle();
      });
      let newrandoms = randoms.concat([newBottle_copy]);
      setRandoms(newrandoms);
      clearNewBottle();
    }
  }, [newBottle]);

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

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

  const randomStyle = () => {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let margin = 100;

    let randomLeft = getRandomNumber(0, winWidth - margin - 100);
    let randomTop = getRandomNumber(
      winHeight / 2,
      Math.min(
        (-winHeight / winWidth) * randomLeft + (4 / 3) * winHeight - margin,
        winHeight - margin
      )
    );
    //(((-4 / 9) * winHeight) / winWidth) * randomLeft + winHeight
    let onBeach =
      (-winHeight / winWidth) * randomLeft + (3 / 2) * winHeight - margin > randomTop
        ? "Home-floating"
        : "";

    const objStyle = {
      position: "absolute",
      top: randomTop + "px",
      left: randomLeft + "px",
      onBeach: onBeach,
    };
    return objStyle;
  };

  const shuffle = () => {
    let size = getRandomNumber(2, 4);
    setSize(size);
    setIsShuffle(!IsShuffle);
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
        style={randomObj.style}
      />
    ));
  } else {
    randomList = <div></div>;
  }

  return (
    <>
      <div className="randomList">{randomList}</div>
      <FontAwesomeIcon icon={faRandom} className="u-icon u-corner-icon" onClick={shuffle} />
    </>
  );
};

export default RandomBottles;
