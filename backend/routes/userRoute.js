const router = require("express").Router();

const {
  Signup,
  Signin,
  AllUsers,
  SingleUser,
  SingleUserProfile,
  UpdateUser,
  FollowUser,
  UnfollowUser,
} = require("../controller/userController");

const auth = require("../middleware/authentication");


router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/allusers",auth, AllUsers);
router.get("/singleprofile/:id", auth, SingleUserProfile)
router.get("/ownprofile",auth, SingleUser);
router.put("/follow/:id", auth, FollowUser);
router.put("/unfollow/:id", auth, UnfollowUser);
router.put("/update",auth, UpdateUser);

module.exports = router;
