/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const MY_NAME = "Rui Wang";
const MY_ID = "7";

const data = {
  stories: [
    {
      _id: 0,
      creator_id: 7,
      creator_name: "Rui Wang",
      content: "I love corgis!",
      tag: "1900s",
      title: "corgis",
    },
    {
      _id: 1,
      creator_id: 7,
      creator_name: "Rui Wang",
      content: "noooo! I forget my pasword",
      tag: "1800s",
      title: "no",
    },
    {
      _id: 2,
      creator_id: 0,
      creator_name: "Joes White",
      content: "cats! I prefer cats than dogs!",
      tag: "1600s",
      title: "cat",
    },
  ],
  comments: [
    {
      _id: 0,
      creator_id: 0,
      creator_name: "Jessica Tang",
      parent: 0,
      content: "comment1",
    },
    {
      _id: 1,
      creator_id: 7,
      creator_name: "Rui Wang",
      parent: 1,
      content: "comment2",
    },
    {
      _id: 2,
      creator_id: 7,
      creator_name: "Rui Wang",
      parent: 2,
      content: "comment3",
    },
    {
      _id: 3,
      creator_id: 7,
      creator_name: "Rui Wang",
      parent: 2,
      content: "comment4",
    },
  ],
};

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Story = require("./models/story");
const Comment = require("./models/comment");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/drops", (req, res) => {
  // const filteredStories = data.stories.filter((story) => story.creator_id == MY_ID);
  // res.send(filteredStories);

  Story.find({ creator_id: req.user._id }).then((stories) => {
    res.send(stories);
  });
});

router.get("/pickups", (req, res) => {
  const filteredComments = data.comments.filter((comment) => comment.creator_id == MY_ID);
  const filteredParents = filteredComments.map((comment) => comment.parent);
  const uniqueParents = filteredParents.filter((p, index) => filteredParents.indexOf(p) == index);
  const filteredStories = data.stories.filter(
    (story) => uniqueParents.includes(story._id) && story.creator_id != MY_ID
  );

  res.send(filteredStories);
});

router.post("/story", (req, res) => {
  const newStory = new Story({
    // _id: data.stories.length,
    creator_id: req.user._id,
    creator_name: req.user.name,
    tag: req.body.tag,
    title: req.body.title,
    content: req.body.content,
  });

  // data.stories.push(newStory);
  // res.send(newStory);

  newStory.save().then((story) => res.send(story));
});

router.get("/comments", (req, res) => {
  // const filteredComments = data.comments.filter((comment) => comment.parent == req.query.parent);
  // res.send(filteredComments);

  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comments", (req, res) => {
  const newComment = new Comment({
    // _id: data.comments.length,
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });

  // data.comments.push(newComment);
  // res.send(newComment);

  newComment.save().then((comment) => res.send(comment));
});

router.get("/stories", (req, res) => {
  // const stories = data.stories;
  // res.send(stories);

  Story.find({}).then((stories) => res.send(stories));
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
