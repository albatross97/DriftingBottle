import React, { useState } from "react";
import { post } from "../../utilities";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./NewStory.css";

const NewPostInput = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(title, content, tag);
    setTitle("");
    setContent("");
    setTag("");
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
          value={content}
          onChange={handleContentChange}
          className="NewStory-content"
          required
        />
      </div>
      <div className="NewStory-container" onChange={handleTagChange}>
        <label>
          <input type="radio" value="1700s" name="tag" required />
          1700s
        </label>
        <label>
          <input type="radio" value="1800s" name="tag" />
          1800s
        </label>
        <label>
          <input type="radio" value="1900s" name="tag" />
          1900s
        </label>
        <label>
          <input type="radio" value="2000s" name="tag" />
          2000s
        </label>
      </div>
      <div className="NewStory-container u-textRight">
        <button
          type="submit"
          className="NewStory-button"
          value="Submit"
          onClick={title != "" && content != "" && tag != "" ? handleSubmit : null}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="font u-pointer" />
        </button>
      </div>
    </form>
  );
};

const NewStory = (props) => {
  const addStory = (title, content, tag) => {
    const body = { content: content, title: title, tag: tag };
    post("/api/story", body).then((story) => {
      // props.addNewStory(story);
      // props.handleClose();
    });
  };

  return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
};

export { NewStory };
