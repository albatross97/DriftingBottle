import "./Profile.css";
import "../../utilities.css";
import Bottle from "../modules/Bottle.js";
import { get } from "../../utilities";

import React, { useState, useEffect } from "react";

const Profile = (props) => {
  //filtered stories that the user created
  const [drops, setDrops] = useState([]);
  //filtered stories that the user made comments
  const [pickups, setPickups] = useState([]);

  const [user, setUser] = useState(null);
  if (!user) {
    return (
      <div className="Profile-loading">
        <span>Loading... </span>
      </div>
    );
  }
  useEffect(() => {
    // document.title = "Profile Page";
    get("/api/drops", { userid: props.userId }).then((dropObjs) => {
      let reversedDropObjs = dropObjs.reverse();
      setDrops(reversedDropObjs);
    });
    get("/api/pickups", { userid: props.userId }).then((pickupObjs) => {
      let reversedPickupObjs = pickupObjs.reverse();
      setPickups(reversedPickupObjs);
    });
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
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
      <div className="Profile-name u-textCenter">{user.name}</div>
      <div className="Profile-info u-textCenter">
        <span>Drop {drops.length} bottle</span>
        <span> | </span>
        <span>Pick up {pickups.length} bottles</span>
      </div>
      <div className="u-flex">
        <div className="Profile-subContainer middle">{dropList}</div>
        <div className="Profile-subContainer">{pickupList}</div>
      </div>
    </section>
  );
};

export default Profile;
