import "./Profile.css";
import "../../utilities.css";
import Bottle from "../modules/Bottle.js";
import { get } from "../../utilities";

import React, { useState, useEffect } from "react";

const Profile = () => {
  //filtered stories that the user created
  const [stories, setStories] = useState([]);
  //filtered stories that the user made comments
  const [comments, setComments] = useState([]);

  useEffect(() => {
    document.title = "Profile Page";
    get("/api/stories").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      setStories(reversedStoryObjs);
    });
    get("/api/comments").then((commentsObjs) => {
      let reversedCommentObjs = commentsObjs.reverse();
      setComments(reversedCommentObjs);
    });
  }, []);

  let storiesList = null;
  const hasStories = stories.length !== 0;
  if (hasStories) {
    storiesList = stories.map((storyObj) => (
      <Bottle
        key={`Bottle_${storyObj._id}`}
        _id={storyObj._id}
        creator_name={storyObj.creator_name}
        title={storyObj.title}
        content={storyObj.content}
        tag={storyObj.tag}
      />
    ));
  } else {
    storiesList = <div>No bottles!</div>;
  }

  let commentList = null;
  const hasComments = comments.length !== 0;
  if (hasComments) {
    commentList = comments.map((commentsObjs) => (
      <Bottle
        key={`Bottle_${commentsObjs._id}`}
        _id={commentsObjs._id}
        creator_name={commentsObjs.creator_name}
        title={commentsObjs.title}
        content={commentsObjs.content}
        tag={commentsObjs.tag}
      />
    ));
  } else {
    commentList = <div>No bottles!</div>;
  }

  return (
    <section className="Profile-container ">
      <div className="Profile-avatarContainer ">
        <div className="Profile-avatar " />
      </div>
      <div className="Profile-name u-textCenter">Rui Wang</div>
      <div className="Profile-info u-textCenter">
        <span>Drop {storiesList.length} bottle</span>
        <span> | </span>
        <span>Pick up {commentList.length} bottles</span>
      </div>
      <div className="u-flex">
        <div className="Profile-subContainer middle">{storiesList}</div>
        <div className="Profile-subContainer">{commentList}</div>
      </div>
    </section>
  );
};

export default Profile;
