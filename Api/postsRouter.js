const express = require("express");
const router = express.Router();
const dbServices = require("../Services/generyServices.js");

// GET all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await dbServices.getAll("posts");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET posts by userId
router.get("/posts/user", async (req, res) => {
  const { userId } = req.query;
  try {
    const posts = await dbServices.getObjectsByField("posts", "userId", userId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET post by ID
router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await dbServices.getObjectById("posts", id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new post
router.post("/posts", async (req, res) => {
  const data = req.body;
  try {
    const newPost = await dbServices.createObject("posts", data);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE post
router.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedPost = await dbServices.updateObject("posts", id, data);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE post
router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbServices.deleteObject("posts", id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
