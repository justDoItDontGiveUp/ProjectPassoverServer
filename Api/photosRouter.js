const express = require("express");
const router = express.Router();
const dbServices = require("../Services/generyServices.js");

// GET all photos in an album
router.get("/albums/:albumId/photos", async (req, res) => {
  const { albumId } = req.params;
  try {
    const photos = await dbServices.getObjectsByField("photos", "albumId", albumId);
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET photo by ID in a specific album
router.get("/albums/:albumId/photos/:id", async (req, res) => {
  const { albumId, id } = req.params;
  try {
    const photo = await dbServices.getObjectById("photos", id);
    if (photo && photo.albumId === albumId) {
      res.status(200).json(photo);
    } else {
      res.status(404).json({ error: "Photo not found in this album" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a new photo in a specific album
router.post("/albums/:albumId/photos", async (req, res) => {
  const { albumId } = req.params;
  const data = req.body;
  data.albumId = albumId;  // Associate the photo with the album
  try {
    const newPhoto = await dbServices.createObject("photos", data);
    res.status(201).json(newPhoto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a photo in a specific album
router.put("/albums/:albumId/photos/:id", async (req, res) => {
  const { albumId, id } = req.params;
  const data = req.body;
  try {
    const updatedPhoto = await dbServices.updateObject("photos", id, data);
    if (updatedPhoto.albumId === albumId) {
      res.status(200).json(updatedPhoto);
    } else {
      res.status(404).json({ error: "Photo not found in this album" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a photo in a specific album
router.delete("/albums/:albumId/photos/:id", async (req, res) => {
  const { albumId, id } = req.params;
  try {
    const photo = await dbServices.getObjectById("photos", id);
    if (photo && photo.albumId === albumId) {
      await dbServices.deleteObject("photos", id);
      res.status(200).json({ message: "Photo deleted successfully" });
    } else {
      res.status(404).json({ error: "Photo not found in this album" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
