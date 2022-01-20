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
      <div className="NewStory-container u-flexColumn">
        <label>Title</label>
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
      <div className="NewStory-container NewStory-tagbar" onChange={handleTagChange}>
        <label> Tag</label>
        <label>
          <input type="radio" value="general" name="tag" required />
          <span className="general">general</span>
        </label>
        <label>
          <input type="radio" value="question" name="tag" />
          <span className="question">question</span>
        </label>
        <label>
          <input type="radio" value="wishing" name="tag" />
          <span className="wishing">wishing</span>
        </label>
        <label>
          <input type="radio" value="venting" name="tag" />
          <span className="venting">venting</span>
        </label>
      </div>
      <div className="NewStory-container u-textRight">
        <button
          type="submit"
          className="NewStory-button"
          value="Submit"
          onClick={title != "" && content != "" && tag != "" ? handleSubmit : null}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="font" />
        </button>
      </div>
    </form>
  );
};

const NewStory = (props) => {
  const addStory = (title, content, tag) => {
    const body = { content: content, title: title, tag: tag };
    post("/api/story", body).then((story) => {
      props.addNewBottles(story);
      props.handleClose();
    });
  };

  return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
};

export { NewStory };
