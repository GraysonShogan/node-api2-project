const express = require("express");
const Posts = require("./posts-model");

const router = express.Router();

// GET /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
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
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The post information could not be retrieved" });
  }
});

// POST /api/posts
router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    try {
      const newPost = await Posts.add(req.body);
      res.status(201).json(newPost);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "There was an error while saving the post to the database",
        });
    }
  }
});

// PUT /api/posts/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    try {
      const updatedPost = await Posts.update(id, req.body);
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "The post information could not be modified" });
    }
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
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "The post could not be removed" });
  }
});

// GET /api/posts/:id/comments
router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Posts.findPostComments(id);
    if (comments) {
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The comments information could not be retrieved" });
  }
});

module.exports = router;
