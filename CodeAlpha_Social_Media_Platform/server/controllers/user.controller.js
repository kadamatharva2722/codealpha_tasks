const User = require("../models/User");
const Post = require("../models/Post");

// FOLLOW / UNFOLLOW USER
exports.toggleFollow = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser)
      return res.status(404).json({ message: "User not found" });

    if (req.user._id.toString() === targetUser._id.toString())
      return res.status(400).json({ message: "Cannot follow yourself" });

    const isFollowing = currentUser.following.includes(targetUser._id);

    if (isFollowing) {
      currentUser.following.pull(targetUser._id);
      targetUser.followers.pull(req.user._id);
    } else {
      currentUser.following.push(targetUser._id);
      targetUser.followers.push(req.user._id);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      following: currentUser.following.length,
      followers: targetUser.followers.length,
      isFollowing: !isFollowing,
    });
  } catch (error) {
    res.status(500).json({ message: "Follow action failed" });
  }
};

// GET USER PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "username avatar")
      .populate("following", "username avatar");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Profile fetch failed" });
  }
};

// GET USER POSTS
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });
    console.log(posts);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Posts fetch failed" });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    if (!q) return res.json([]);

    const users = await User.find({
      username: { $regex: q, $options: "i" },
    })
      .select("_id username avatar")
      .limit(10);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username || user.username;
    user.bio = bio || user.bio;

    await user.save();

    res.json({
      message: "Profile updated",
      user: {
        id: user._id,
        username: user.username,
        bio: user.bio,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
