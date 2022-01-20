import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "201438548888-g2rufrqljhpc5mn1sqcv3d3kfrc2ke38.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div className="Login-container">
      <div className="Login-google">
        <Link to="/home">
          {!userId && (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={handleLogin}
              onFailure={(err) => console.log(err)}
              render={(renderProps) => (
                <button onClick={renderProps.onClick} className="Login">
                  Start
                </button>
              )}
            />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Skeleton;
