import React, { useState, useEffect } from "react";
import "./Parchment.css";
import SinglePost from "./SinglePost.js";
import { NewComment } from "./NewComment.js";
import { NewStory } from "./NewStory.js";
import { get, post } from "../../utilities";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
            <NewStory handleClose={togglePop} addNewBottles={props.addNewBottles} />
          </div>
        </div>
      )}
      <FontAwesomeIcon
        icon={faPlusCircle}
        className="u-icon u-corner-icon u-add"
        onClick={togglePop}
      />
    </>
  );
};

// Profile pickup bottles and add new comments
const ViewParchment = (props) => {
  const [comments, setComments] = useState([]);
  const [IsTrash, setIsTrash] = useState(true);

  useEffect(() => {
    get("/api/comments", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  const toggleIsTrash = () => {
    setIsTrash(!IsTrash);
  };

  const deleteStory = () => {
    const deletedStory = async () => {
      return await post("/api/deleteStory", { storyid: props._id });
    };

    deletedStory().then((story) => {
      // console.log(story);
      props.deleteOneDrop(props._id);
      props.handleClose(); // close popup
    });
  };

  const tagColor =
    props.tag == "venting"
      ? "#316778"
      : props.tag == "question"
      ? "#BF8A6A"
      : props.tag == "wishing"
      ? "#EFCD9E"
      : "";

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <div className="story-top">
          <div className="story-title">{props.title}</div>
          <div className="Bottle-tag" style={{ backgroundColor: tagColor }}>
            {props.tag}
          </div>
          {props.delete && (
            <div className="Bottle-delete">
              {IsTrash && (
                <FontAwesomeIcon icon={faTrashAlt} onClick={toggleIsTrash} className="u-pointer " />
              )}

              {!IsTrash && (
                <>
                  <button className="parchment-btn  parchment-cancel" onClick={toggleIsTrash}>
                    Cancel
                  </button>
                  <button className="parchment-btn parchment-delete" onClick={deleteStory}>
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
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
