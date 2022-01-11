import "./Profile.css";
import "../../utilities.css";
import Bottle from "../modules/Bottle.js";
import { get } from "../../utilities";

import React, { useState, useEffect } from "react";

const Profile = () => {
  //filtered stories that the user created
  const [drops, setDrops] = useState([]);
  //filtered stories that the user made comments
  const [pickups, setPickups] = useState([]);

  useEffect(() => {
    document.title = "Profile Page";
    get("/api/drops").then((dropObjs) => {
      let reversedDropObjs = dropObjs.reverse();
      setDrops(reversedDropObjs);
    });
    get("/api/pickups").then((pickupObjs) => {
      let reversedPickupObjs = pickupObjs.reverse();
      setPickups(reversedPickupObjs);
    });
  }, []);

  let dropList = null;
  const hasDrops = drops.length !== 0;
  if (hasDrops) {
    dropList = drops.map((dropObj) => (
      <Bottle
        key={`Bottle_${dropObj._id}`}
        _id={dropObj._id}
        creator_name={dropObj.creator_name}
        creator_id={dropObj.creator_id}
        title={dropObj.title}
        content={dropObj.content}
        tag={dropObj.tag}
      />
    ));
  } else {
    dropList = <div>No bottles!</div>;
  }

  let pickupList = null;
  const hasPickups = pickups.length !== 0;
  if (hasPickups) {
    pickupList = pickups.map((pickupObjs) => (
      <Bottle
        key={`Bottle_${pickupObjs._id}`}
        _id={pickupObjs._id}
        creator_name={pickupObjs.creator_name}
        creator_id={pickupObjs.creator_id}
        title={pickupObjs.title}
        tag={pickupObjs.tag}
        content={pickupObjs.content}
      />
    ));
  } else {
    pickupList = <div>No bottles!</div>;
  }

  return (
    <section className="Profile-container ">
      <div className="Profile-avatarContainer ">
        <div className="Profile-avatar " />
      </div>
      <div className="Profile-name u-textCenter">Rui Wang</div>
      <div className="Profile-info u-textCenter">
        <span>Drop {dropList.length} bottle</span>
        <span> | </span>
        <span>Pick up {pickupList.length} bottles</span>
      </div>
      <div className="u-flex">
        <div className="Profile-subContainer middle">{dropList}</div>
        <div className="Profile-subContainer">{pickupList}</div>
      </div>
    </section>
  );
};

export default Profile;
