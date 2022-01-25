import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWater, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import { Link } from "@reach/router";
import icon from "../images/icon.png";
import "./NavBar.css";

const GOOGLE_CLIENT_ID = "201438548888-g2rufrqljhpc5mn1sqcv3d3kfrc2ke38.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <nav className="NavBar-container">
        <div className="NavBar-title">
          <img src={icon} id="icon" />
          <div>Drifting Bottle</div>
        </div>
        <div className="NavBar-linkContainer u-flexColumn">
          <div className="NavBar-link">
            {userId && (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={handleLogout}
                onFailure={(err) => console.log(err)}
                render={(renderProps) => (
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="u-icon"
                    onClick={renderProps.onClick}
                  />
                )}
              />
            )}
          </div>
          <Link to={`/profile/${userId}`} className="NavBar-link">
            <FontAwesomeIcon icon={faUser} className="u-icon" />
          </Link>
          <Link to="/home/" className="NavBar-link">
            <FontAwesomeIcon icon={faWater} className="u-icon" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
