const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      postedBy: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
