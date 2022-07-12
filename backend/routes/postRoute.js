const router = require("express").Router();

const {
  CreatePost,
  GetPost,
  GetMyPost,
  LikePost,
  CommentPost,
  DeletePost,
} = require("../controller/postController");
const auth = require("../middleware/authentication");


router.post("/createpost", auth, CreatePost);
router.get("/allpost",auth, GetPost);
router.get("/myposts",auth, GetMyPost);
router.put("/like",auth, LikePost);
router.put("/comment", auth, CommentPost);
router.delete("/deletepost/:id", DeletePost);

module.exports = router;
