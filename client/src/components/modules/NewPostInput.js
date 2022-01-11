import React, { useState } from "react";
import { post } from "../../utilities";

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
    <div className="u-flex">
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        className="NewPostInput-input"
      />
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
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

const NewStory = (props) => {
  const addStory = (value) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      props.addNewStory(story);
    });
  };

  return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
};

export { NewComment, NewStory };
