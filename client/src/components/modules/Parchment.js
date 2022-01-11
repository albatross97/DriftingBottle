import React, { useState, useEffect } from "react";
import "./Parchment.css";
import SingleStory from "./SingleStory.js";
import { NewComment, NewStory } from "./NewPostInput.js";
import { get } from "../../utilities";

// NavBar drop new bottles
const NewParchment = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <NewStory />
      </div>
    </div>
  );
};

// Profile pickup bottles and add new comments
const ViewParchment = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/api/comments", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <div className="story-title">{props.title}</div>
        <SingleStory
          _id={props._id}
          creator_name={props.creator_name}
          creator_id={props.creator_id}
          content={props.content}
        />
        <div className="story-comments">
          {comments &&
            comments.map((comment) => (
              <SingleStory
                key={`SingleComment_${comment._id}`}
                _id={comment._id}
                creator_name={comment.creator_name}
                content={comment.content}
              />
            ))}
        </div>
        <NewComment storyId={props._id} addNewComment={addNewComment} />
      </div>
    </div>
  );
};

export { NewParchment, ViewParchment };
