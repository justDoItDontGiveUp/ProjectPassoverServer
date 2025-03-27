const express = require("express");
const router = express.Router();
const dbServices = require("../Services/generyServices.js");

// GET comments for a specific post
router.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await dbServices.getObjectsByField("comments", "postId", postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET specific comment by ID under a specific post
router.get("/posts/:postId/comments/:id", async (req, res) => {
  const { id, postId } = req.params;
  try {
    const comment = await dbServices.getObjectByFields("comments", { id, postId });
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new comment for a specific post
router.post("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const data = { ...req.body, postId };
  try {
    const newComment = await dbServices.createObject("comments", data);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE comment under a specific post
router.put("/posts/:postId/comments/:id", async (req, res) => {
  const { id, postId } = req.params;
  const data = req.body;
  try {
    const updatedComment = await dbServices.updateObjectByFields("comments", { id, postId }, data);
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE comment under a specific post
router.delete("/posts/:postId/comments/:id", async (req, res) => {
  const { id, postId } = req.params;
  try {
    await dbServices.deleteObjectByFields("comments", { id, postId });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
