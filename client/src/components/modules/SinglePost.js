import React from "react";
import { Link } from "@reach/router";
import './SinglePost.css'
/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
const SinglePost = (props) => {
  return (
    <div className="single-story">
      {/* <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link> */}
      <div className="single-name">{props.creator_name}</div>
      <div className="single-content">{props.content}</div>
    </div>
  );
};

export default SinglePost;
