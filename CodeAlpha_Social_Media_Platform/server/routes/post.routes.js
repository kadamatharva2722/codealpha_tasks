const express = require("express");
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const {
  createPost,
  getFeed,
  toggleLike,
  deletePost,
} = require("../controllers/post.controller");

const router = express.Router();

router.post("/", auth, upload.single("image"), createPost); // 👈 IMPORTANT
router.get("/feed", auth, getFeed);
router.put("/like/:id", auth, toggleLike);
router.delete("/:id", auth, deletePost);

module.exports = router;
