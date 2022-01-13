import React, { useState } from "react";
import { post } from "../../utilities";

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
    <form className="u-flex">
      <label> Title</label>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={handleTitleChange}
        className="NewPostInput-title"
        required
      />
      <label> Content</label>
      <input
        type="text"
        placeholder="content"
        value={value}
        onChange={handleContentChange}
        className="NewPostInput-content"
        required
      />
      <div>
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
      <button
        type="submit"
        className="NewPostInput-button u-pointer"
        value="Submit"
        onClick={(title != "" && value != "") ? handleSubmit : null}
      >
        Submit
      </button>
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
