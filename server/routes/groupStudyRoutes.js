import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
   createRoom,
   getMyRooms,
   getRoom,
   updateRoomVideo,
   deleteRoom,
   leaveRoom,
   removeMember,
   getRoomMessages,
   deleteMessage,
   clearChat,
} from "../controllers/groupStudyController.js";

const router = express.Router();

router.post("/", protect, createRoom);
router.get("/", protect, getMyRooms);
router.get("/:id", protect, getRoom);
router.get("/:id/messages", protect, getRoomMessages);
router.put("/leave/:id", protect, leaveRoom);
router.put("/remove/:roomId/:memberId", protect, removeMember);
router.put("/:id/video", protect, updateRoomVideo);
router.delete("/:id", protect, deleteRoom);

// New: message delete + clear chat
router.delete("/:id/messages/:messageId", protect, deleteMessage);
router.delete("/:id/messages", protect, clearChat);

export default router;