const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

// GET /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts" });
  }
});

// GET /api/posts/:id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findById(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the post" });
  }
});

// POST /api/posts
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ message: "Title and content are required" });
  }
  try {
    const newPost = await Posts.add(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating the post" });
  }
});

// PUT /api/posts/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ message: "Title and content are required" });
  }
  try {
    const updatedPost = await Posts.update(id, req.body);
    if (updatedPost) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating the post" });
  }
});

// DELETE /api/posts/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Posts.remove(id);
    if (deletedPost) {
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting the post" });
  }
});

// GET /api/posts/:id/comments
router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Posts.findPostComments(id);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving comments" });
  }
});

module.exports = router;
