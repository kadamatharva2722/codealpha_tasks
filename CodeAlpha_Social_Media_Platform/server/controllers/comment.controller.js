const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "username")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

exports.addComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const comment = await Comment.create({
      user: req.user._id,
      post: req.params.postId,
      text: req.body.text,
    });

    const populated = await comment.populate("user", "username");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};
