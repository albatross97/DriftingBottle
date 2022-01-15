import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "201438548888-g2rufrqljhpc5mn1sqcv3d3kfrc2ke38.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  const inStyle = { };
  return (
    <div className="Login-container">
    <div className="Login-google">
      {userId ? (
        <GoogleLogout
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
          onFailure={(err) => console.log(err)}
      //     render={renderProps => (
      // <button onClick={renderProps.onClick} style={inStyle}>Logout</button>
    // )}
        />
      ) : (
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
      //     render={renderProps => (
      // <button onClick={renderProps.onClick} style={inStyle}>Login</button>
    // )}
        />
      )}
      </div>
    </div>
  );
};

export default Skeleton;
