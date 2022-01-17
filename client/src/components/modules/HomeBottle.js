import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Bottle.css";
import { ViewParchment } from "./Parchment.js";
import bt1 from "../images/bt1.png";
import bt2 from "../images/bt2.png";
import bt3 from "../images/bt3.png";

const HomeBottle = (props) => {
  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  };
  const bts = [bt1, bt2, bt3];
  const randombt = bts[Math.floor(Math.random() * bts.length)];

  const tagColor =
    props.tag == "venting"
      ? "#316778"
      : props.tag == "question"
      ? "#BF8A6A"
      : props.tag == "wishing"
      ? "#EFCD9E"
      : "";

  return (
    <div
      style={{
        position: "absolute",

        top: `${props.style.top}`,
        left: `${props.style.left}`,
      }}
      className="u-flexColumn u-flex-alignCenter bottle"
    >
      {!seen && (
        <div className="Bottle-tag" style={{ backgroundColor: tagColor }}>
          {props.tag}
        </div>
      )}
      {!seen && <img src={randombt} className="Home-bottle-icon" onClick={togglePop} />}
      {seen && (
        <ViewParchment
          handleClose={togglePop}
          title={props.title}
          tag={props.tag}
          content={props.content}
          _id={props._id}
          creator_name={props.creator_name}
          creator_id={props.creator_id}
        />
      )}
    </div>
  );
};

export default HomeBottle;
