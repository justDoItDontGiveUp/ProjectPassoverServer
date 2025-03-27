const express = require("express");
const router = express.Router();
const dbServices = require("../Services/generyServices.js");

// GET all albums
router.get("/albums", async (req, res) => {
  try {
    const albums = await dbServices.getAll("albums");
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET albums by userId
router.get("/albums/user", async (req, res) => {
  const { userId } = req.query;
  try {
    const albums = await dbServices.getObjectsByField("albums", "userId", userId);
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET album by ID
router.get("/albums/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const album = await dbServices.getObjectById("albums", id);
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new album
router.post("/albums", async (req, res) => {
  const data = req.body;
  try {
    const newAlbum = await dbServices.createObject("albums", data);
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE album
router.put("/albums/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedAlbum = await dbServices.updateObject("albums", id, data);
    res.status(200).json(updatedAlbum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE album
router.delete("/albums/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbServices.deleteObject("albums", id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
