import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faPlusCircle, faRegistered } from "@fortawesome/free-solid-svg-icons";

import { NewParchment } from "./Parchment.js";

import { Link } from "@reach/router";
import icon from "./icon.png";
import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  };

  return (
    <>
      <div className="NavBar-add">{seen && <NewParchment handleClose={togglePop} />}</div>
      <nav className="NavBar-container">
        <div className="NavBar-title">
          <img src={icon} id="icon" />
          <div>Drifting Bottle</div>
        </div>
        <div className="NavBar-linkContainer u-flexColumn">
          <Link to="/" className="NavBar-link">
            <FontAwesomeIcon icon={faRegistered} className="font" />
          </Link>
          <div className="NavBar-link" onClick={togglePop}>
            <FontAwesomeIcon icon={faPlusCircle} className="font" />
          </div>
          <Link to="/profile/" className="NavBar-link">
            <FontAwesomeIcon icon={faUser} className="font" />
          </Link>
          <Link to="/home/" className="NavBar-link">
            <FontAwesomeIcon icon={faHome} className="font" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
