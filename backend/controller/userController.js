const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// Create new user......
const Signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Please fill all the fields.." });
    }
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ error: "User already exist." });
    }

    const hashPassword = await bcryptjs.hash(password, 12);
    const user = new User({ email, username, password: hashPassword });

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//Login userss.......
const Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide credentials." });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      res.status(400).json({ error: "Invalid Credentials." });
    } else {
      const matchPassword = await bcryptjs.compare(
        password,
        existUser.password
      );

      if (matchPassword) {
        const token = jwt.sign({ _id: existUser._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).json({ token, existUser });
      } else {
        console.log("Create problems");
        res.status(400).json({ error: "Invalid Credentials." });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// get all users.....
const AllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Get a single users.....
const SingleUser = async (req, res) => {
  const ownProfile = await User.findById({ _id: req.user._id });
  if (!ownProfile) {
    return res.status(400).json({ error: "User not found." });
  } else {
    res.status(200).json({ ownProfile });
  }
};

// Update users.......
const UpdateUser = async (req, res) => {
  console.log(req.body.photo);
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      $set: { photo: req.body.photo },
    });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Getting single user to make profile....
const SingleUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    const post = await Post.find({ postedBy: id });
    res.status(200).json({ user, post });
  } catch (error) {
    res.status(400).json(error);
    l;
  }
};

const FollowUser = async (req, res) => {
  const { id } = req.params;
  try {
    const follow = await User.findByIdAndUpdate(
      id,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    );
    const following = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: id },
      },
      { new: true }
    );
    res.status(200).json({ follow, following });
  } catch (error) {
    res.status(400).json(error);
  }
};

const UnfollowUser = async (req, res) => {
  const { id } = req.params;
  try {
    const follow = await User.findByIdAndUpdate(
      id,
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    );
    const following = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: id },
      },
      { new: true }
    );
    res.status(200).json({ follow, following });
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = {
  Signup,
  Signin,
  AllUsers,
  SingleUser,
  SingleUserProfile,
  UpdateUser,
  FollowUser,
  UnfollowUser,
};
