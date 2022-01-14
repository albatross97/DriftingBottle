import React, { useState, useEffect } from "react";
import "./Parchment.css";
import SinglePost from "./SinglePost.js";
import { NewComment } from "./NewComment.js";
import { NewStory } from "./NewStory.js";
import { get } from "../../utilities";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faRandom } from "@fortawesome/free-solid-svg-icons";

// Home add new bottle btn
// Click btn then pop new parchment
const NewParchment = (props) => {
  const [seen, setSeen] = useState(false);

  const togglePop = () => {
    setSeen(!seen);
  };
  return (
    <>
      {seen && (
        <div className="popup-box">
          <div className="box">
            <span className="close-icon" onClick={togglePop}>
              x
            </span>
            <NewStory handleClose={togglePop} />
          </div>
        </div>
      )}
      <FontAwesomeIcon icon={faPlusCircle} className="u-icon" onClick={togglePop} />
    </>
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
        <SinglePost
          _id={props._id}
          creator_name={props.creator_name}
          creator_id={props.creator_id}
          content={props.content}
        />
        <div className="story-comments">
          {comments &&
            comments.map((comment) => (
              <SinglePost
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
