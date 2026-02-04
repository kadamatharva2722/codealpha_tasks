const express = require("express");
const auth = require("../middleware/auth.middleware");
const {
  toggleFollow,
  getUserProfile,
  getUserPosts,
  searchUsers,
  updateProfile,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/search", auth, searchUsers);   // ✅ MUST BE FIRST
router.put("/me", auth, updateProfile);
router.put("/follow/:id", auth, toggleFollow);
router.get("/:id/posts", auth, getUserPosts);
router.get("/:id", auth, getUserProfile);


module.exports = router;
