const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { PostModel } = require("../models/post.model");

const postRouter = express.Router();

postRouter.post("/add", auth, async (req, res) => {
  // console.log(req.body);
  try {
    let newPost = new PostModel(req.body);
    newPost.save();
    res.status(200).json({ msg: `New post added` });
  } catch (error) {
    res.status(400).json({ error });
  }
});

postRouter.get("/", auth, async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userID });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error });
  }
});

postRouter.get("/top", auth, async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userID })
      .where("no_of_comments")
      .sort("-no_of_comments")
      .limit(3);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error });
  }
});

postRouter.post("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id });
    if (req.body.userID !== post.userID) {
      return res.status(200).json({ msg: `You are not authorised` });
    }
    await PostModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ msg: `Post has been updated` });
  } catch (error) {
    res.status(400).json({ error });
  }
});

postRouter.post("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findOne({ _id: id });
    if (req.body.userID !== post.userID) {
      return res.status(200).json({ msg: `You are not authorised` });
    }
    await PostModel.findByIdAndDelete({ _id: id }, req.body);
    res.status(200).json({ msg: `Post has been deleted` });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = { postRouter };
