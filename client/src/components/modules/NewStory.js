import React, { useState } from "react";
import { post } from "../../utilities";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./NewStory.css";

const NewPostInput = (props) => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    props.onSubmit && props.onSubmit(title, value);
    setTitle("");
    setValue("");
  };

  return (
    <form className="u-flexColumn">
      <div className="NewStory-container">
        <label> Title</label>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={handleTitleChange}
          className="NewStory-title"
          required
        />
      </div>
      <div className="NewStory-container u-flexColumn">
        <label> Content</label>
        <textarea
          type="text"
          placeholder="content"
          value={value}
          onChange={handleContentChange}
          className="NewStory-content"
          required
        />
      </div>
      <div className="NewStory-container">
        <label>
          <input type="radio" value="male" required />
          1700s
        </label>
        <label>
          <input type="radio" value="female" />
          1800s
        </label>
        <label>
          <input type="radio" value="other" />
          1900s
        </label>
      </div>
      <div className="NewStory-container u-textRight">
        <button
          type="submit"
          className="NewStory-button"
          value="Submit"
          onClick={title != "" && value != "" ? handleSubmit : null}
        >
          {/* Submit */}
          <FontAwesomeIcon icon={faPaperPlane} className="font u-pointer" />
        </button>
      </div>
    </form>
  );
};

const NewStory = (props) => {
  const addStory = (title, value) => {
    const body = { content: value, title: title, tag: "test" };
    post("/api/story", body).then((story) => {
      // props.addNewStory(story);
    });
    props.handleClose();
  };

  return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
};

export { NewStory };
