const Post = require("../models/post");

const CreatePost = async (req, res) => {
  const { content, image } = req.body;

  try {
    if (!content || !image) {
      return res.status(400).json({ error: "Please fill all the fields." });
    }
    req.user.email = undefined;
    req.user.password = undefined;

    const post = new Post({
      content,
      photo: image,
      postedBy: req.user,
    });

    await post.save();

    res.status(200).json({ post });
  } catch (error) {
    resizeBy.status(400).json({ error: error });
  }
};

// Getting all the posts....
const GetPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "username _id photo")
      .populate("comments.postedBy", "_id username photo");
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// get my post..
const GetMyPost = async (req, res) => {
  try {
    const mypost = await Post.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "_id username"
    );
    res.status(200).json({ mypost });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const LikePost = async (req, res) => {
  console.log(req.body.postId);
  try {
    const like = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({ like });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const CommentPost = async (req, res) => {
  console.log(req.body.text);
  try {
    if (!req.body.text) {
      return res.status(400).json({ message: "Please write you comments." });
    }
    const comment = {
      text: req.body.text,
      postedBy: req.user._id,
    };
    const commentsPost = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      { new: true }
    )
      .populate("comments.postedBy", "_id username")
      .populate("postedBy", "_id username");

    res.status(200).json({ commentsPost });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const DeletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndDelete({ _id: id });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  CreatePost,
  GetPost,
  LikePost,
  DeletePost,
  GetMyPost,
  CommentPost,
};
