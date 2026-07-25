import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getRoomNotes, saveRoomNotes } from "../controllers/roomNoteController.js";

const router = express.Router();

router.get("/:roomId", protect, getRoomNotes);
router.post("/", protect, saveRoomNotes);

export default router;