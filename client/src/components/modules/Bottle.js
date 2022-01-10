import React from "react";
import "../../utilities.css";
import "./Bottle.css";

const Bottle = (props) => {
  return (
    <div className="u-flexColumn u-flex-alignCenter">
      <svg id="bottle" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="200 0 300 700">
        <g>
          <path
            d="M405,302.6c0,0-24-33.2-31.4-94.2v-73.9h11.1v-11.1H375V53.7h-49.9v69.7h-9.7v11.1h11.1v73.9c-7.4,61-31.4,94.2-31.4,94.2
    c-88.6,96.1-24,343.6-24,343.6H345l5.1-1l5.1,1H429C429,646.3,493.7,398.7,405,302.6L405,302.6z"
          />
        </g>
      </svg>
      <div className="Bottle-tag">{props.tag}</div>
    </div>
  );
};

export default Bottle;
