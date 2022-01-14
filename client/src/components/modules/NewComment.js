import React, { useState } from "react";
import { post } from "../../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./NewComment.css";

const NewPostInput = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div className="NewPostInput-container u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <FontAwesomeIcon
        icon={faPaperPlane}
        type="submit"
        className="NewPostInput-button"
        value="Submit"
        onClick={handleSubmit}
      />
    </div>
  );
};

const NewComment = (props) => {
  const addComment = (value) => {
    const body = { parent: props.storyId, content: value };
    post("/api/comments", body).then((comment) => {
      props.addNewComment(comment);
    });
  };

  return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
};

export { NewComment };
