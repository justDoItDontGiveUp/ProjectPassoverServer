const express = require("express");
const router = express.Router();
const dbServices = require("../Services/db.services.js");  

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await dbServices.getAll("users");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user by ID
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await dbServices.getObjectById("users", id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET users by field (e.g., role, city, etc.)
router.get("/users/field", async (req, res) => {
  const { column, value } = req.query;
  try {
    const users = await dbServices.getObjectsByField("users", column, value);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a new user
router.post("/users", async (req, res) => {
  const data = req.body;
  try {
    const newUser = await dbServices.createObject("users", data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE user
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedUser = await dbServices.updateObject("users", id, data);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbServices.deleteObject("users", id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
