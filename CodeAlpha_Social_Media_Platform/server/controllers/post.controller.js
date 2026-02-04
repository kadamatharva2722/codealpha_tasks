const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");
const storage = require("../middleware/upload.middleware");

const upload = multer({ storage });
// UPLOAD POST IMAGE
exports.uploadPostImage = upload.single("image");

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { caption, image } = req.body;

    const post = await Post.create({
      user: req.user._id,
      caption,
      image,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// LIKE / UNLIKE
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likes.includes(req.user._id);

    if (isLiked) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json({ likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Like failed" });
  }
};

// USER FEED
exports.getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      user: { $in: [...user.following, user._id] },
    })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to load feed" });
  }
};
// CREATE POST WITH IMAGE UPLOAD
exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const post = await Post.create({
      user: req.user._id,
      image: `/uploads/${req.file.filename}`, // 👈 IMPORTANT
      caption: req.body.caption || "",
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};