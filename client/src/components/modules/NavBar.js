import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faPlusCircle, faRegistered } from "@fortawesome/free-solid-svg-icons";

import { Link } from "@reach/router";
import icon from "./icon.png";
import "./NavBar.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <>
      <nav className="NavBar-container">
        <div className="NavBar-title">
          <img src={icon} id="icon" />
          <div>Drifting Bottle</div>
        </div>
        <div className="NavBar-linkContainer u-flexColumn">
          <Link to="/" className="NavBar-link">
            <FontAwesomeIcon icon={faRegistered} className="font" />
          </Link>
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
