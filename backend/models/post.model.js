const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    name: String,
    userID: String,
  },
  { versionKey: false }
);

const PostModel = mongoose.model("posts", postSchema);

module.exports = { PostModel };
