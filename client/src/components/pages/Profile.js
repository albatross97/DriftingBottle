import "./Profile.css";
import "../../utilities.css";
import Bottle from "./Bottle.js";

import React, { useState, useEffect } from "react";

const Profile = () => {
  const [catHappiness, setCatHappiness] = useState(0);

  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  const incrementCatHappiness = () => {
    setCatHappiness(catHappiness + 1);
  };

  return (
    <>
      <section className="Profile-container">
        <div
          className="Profile-avatarContainer"
          onClick={() => {
            incrementCatHappiness();
          }}
        >
          <div className="Profile-avatar " />
        </div>
        <div className="Profile-name u-textCenter">Rui Wang</div>
        <div className="Profile-info u-textCenter">Drop 1 bottle | Pick up 3 bottles</div>
        <div className="u-flex">
          <div className="Profile-subContainer u-textRight middle">
            <Bottle />
          </div>
          <div className="Profile-subContainer">
            <Bottle />
            <Bottle />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
