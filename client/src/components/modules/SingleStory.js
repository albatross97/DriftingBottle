import React from "react";
import { Link } from "@reach/router";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
const SingleStory = (props) => {
  return (
    <div className="Card-story">
      {/* <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link> */}
      <div className="u-name">{props.creator_name}</div>
      <div className="Card-storyContent">{props.content}</div>
    </div>
  );
};

export default SingleStory;
