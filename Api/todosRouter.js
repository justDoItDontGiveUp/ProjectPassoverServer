const express = require("express");
const router = express.Router();
const dbServices = require("../Services/generyServices.js");

// GET all todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await dbServices.getAll("todos");
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET todos by userId
router.get("/todos/user", async (req, res) => {
  const { userId } = req.query;
  try {
    const todos = await dbServices.getObjectsByField("todos", "userId", userId);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET todo by ID
router.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await dbServices.getObjectById("todos", id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new todo
router.post("/todos", async (req, res) => {
  const data = req.body;
  try {
    const newTodo = await dbServices.createObject("todos", data);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE todo
router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedTodo = await dbServices.updateObject("todos", id, data);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE todo
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbServices.deleteObject("todos", id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
