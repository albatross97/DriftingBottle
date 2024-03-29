import React, { useState, useEffect } from "react";
import { Router, useNavigate } from "@reach/router";
import NavBar from "./modules/NavBar.js";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import Home from "./pages/Home.js";
import "../utilities.css";

// import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;

    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      window.location.href = "/home";
      // post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
    window.location.href = "/";
  };

  return (
    <>
      {userId && <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />}
      <Router>
        <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <Profile path="/profile/:userId" myId={userId} />
        <Home path="/home" userId={userId} />
        <NotFound default />
      </Router>
    </>
  );
};

export default App;
