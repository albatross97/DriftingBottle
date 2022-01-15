/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

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
  Story.find({ creator_id: req.query.userid }).then((stories) => {
    res.send(stories);
  });
});

router.get("/pickups", (req, res) => {
  // find comments whose creator_id == req.query.userid
  // use map to get their parent (storyID)
  // remove duplicates (one story may contain several comments you post)
  // find stories whose IDs are in storyID list we get from above
  // remove stories whose creator_id == req.query.userid

  Comment.find({ creator_id: req.query.userid }).then((comments) => {
    const parents = comments.map((comment) => comment.parent);
    const stories = [...new Set(parents)];
    console.log(parents);
    console.log(stories);

    const getData = async() =>{
      return Promise.all(stories.map((story) => {return Story.find({_id:story,creator_id: { $ne: req.query.userid }})}))
    }


    
    getData().then((data) => {
      console.log(data.flat())
      res.send(data.flat());
    })

    
  });

  // Story.find({

  //   creator_id: { $ne: req.query.userid },
  // }).then((stories) => res.send(stories));
});

router.post("/story", (req, res) => {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    tag: req.body.tag,
    title: req.body.title,
    content: req.body.content,
  });

  newStory.save().then((story) => res.send(story));
});

router.get("/comments", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comments", (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });
  newComment.save().then((comment) => res.send(comment));
});

router.get("/stories", (req, res) => {
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
