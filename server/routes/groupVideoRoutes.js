import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
   addVideo,
   getPlaylist,
   deleteVideo,
} from "../controllers/groupVideoController.js";

const router = express.Router();

// Add Video
router.post("/", protect, addVideo);

// Get Playlist
router.get("/:roomId", protect, getPlaylist);

// Delete Video
router.delete("/:id", protect, deleteVideo);

export default router;