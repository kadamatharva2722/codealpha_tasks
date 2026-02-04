const express = require("express");
const auth = require("../middleware/auth.middleware");
const {
  addComment,
  getComments,
} = require("../controllers/comment.controller");

const router = express.Router();

router.post("/:postId", auth, addComment);
router.get("/:postId", auth, getComments);

module.exports = router;
