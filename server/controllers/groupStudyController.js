import GroupStudy from "../models/GroupStudy.js";
import Message from "../models/Message.js";

// ==========================================
// CREATE ROOM
// ==========================================
export const createRoom = async (req, res) => {
   try {

      const { roomName, description } = req.body;

      const room = await GroupStudy.create({
         roomName,
         description,
         host: req.user.id,
         members: [req.user.id],
      });

      res.status(201).json(room);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
};

// ==========================================
// GET MY ROOMS
// ==========================================
export const getMyRooms = async (req, res) => {

   try {

      const rooms = await GroupStudy.find({
         members: req.user.id,
      })
      .populate("host", "name email")
      .populate("members", "name email");

      res.json(rooms);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

};

// ==========================================
// GET SINGLE ROOM
// ==========================================
export const getRoom = async (req, res) => {

   try {

      const room = await GroupStudy.findById(req.params.id)
         .populate("host", "name email")
         .populate("members", "name email");

      if (!room) {

         return res.status(404).json({
            message: "Room not found",
         });

      }

      const isMember = room.members.some(
         (member) => member._id.toString() === req.user.id
      );

      if (!isMember) {

         return res.status(403).json({
            message: "Access denied",
         });

      }

      res.json(room);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

};

// ==========================================
// DELETE ROOM
// ==========================================
export const deleteRoom = async (req, res) => {

   try {

      const room = await GroupStudy.findById(req.params.id);

      if (!room) {

         return res.status(404).json({
            message: "Room not found",
         });

      }

      if (room.host.toString() !== req.user.id) {

         return res.status(403).json({
            message: "Only host can delete room",
         });

      }

      await Message.deleteMany({
         roomId: room._id,
      });

      await room.deleteOne();

      res.json({
         message: "Room deleted successfully",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

};

// ==========================================
// LEAVE ROOM
// ==========================================
export const leaveRoom = async (req, res) => {

   try {

      const room = await GroupStudy.findById(req.params.id);

      if (!room) {

         return res.status(404).json({
            message: "Room not found",
         });

      }

      room.members = room.members.filter(
         (member) => member.toString() !== req.user.id
      );

      await room.save();

      res.json({
         message: "You left the room",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

};

// ==========================================
// REMOVE MEMBER (HOST ONLY)
// ==========================================
export const removeMember = async (req, res) => {

   try {

      const room = await GroupStudy.findById(req.params.roomId);

      if (!room) {

         return res.status(404).json({
            message: "Room not found",
         });

      }

      if (room.host.toString() !== req.user.id) {

         return res.status(403).json({
            message: "Only host can remove members",
         });

      }

      room.members = room.members.filter(
         (member) =>
            member.toString() !== req.params.memberId
      );

      await room.save();

      res.json({
         message: "Member removed successfully",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

};

// ==========================================
// GET ROOM CHAT HISTORY
// ==========================================
export const getRoomMessages = async (req, res) => {

   try {

      const messages = await Message.find({
         roomId: req.params.id,
      })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

      res.json(messages);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

};

// ==========================================
// UPDATE ROOM VIDEO
// ==========================================
export const updateRoomVideo = async (req, res) => {
   try {

      const { videoId } = req.body;

      const room = await GroupStudy.findById(req.params.id);

      if (!room) {
         return res.status(404).json({
            message: "Room not found",
         });
      }

      // Only room members can change the video
      const isMember = room.members.some(
         member => member.toString() === req.user.id
      );

      if (!isMember) {
         return res.status(403).json({
            message: "Access denied",
         });
      }

      room.currentVideoId = videoId;
      room.currentTime = 0;
      room.isPlaying = false;

      await room.save();

      res.json({
         success: true,
         room,
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
};

// ==========================================
// DELETE SINGLE MESSAGE (own message only)
// ==========================================
export const deleteMessage = async (req, res) => {

   try {

      const message = await Message.findById(req.params.messageId);

      if (!message) {
         return res.status(404).json({
            message: "Message not found",
         });
      }

      if (message.sender.toString() !== req.user.id) {
         return res.status(403).json({
            message: "You can only delete your own messages",
         });
      }

      await message.deleteOne();

      res.json({
         message: "Message deleted",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

};

// ==========================================
// CLEAR ALL CHAT (host only)
// ==========================================
export const clearChat = async (req, res) => {

   try {

      const room = await GroupStudy.findById(req.params.id);

      if (!room) {
         return res.status(404).json({
            message: "Room not found",
         });
      }

      if (room.host.toString() !== req.user.id) {
         return res.status(403).json({
            message: "Only host can clear chat",
         });
      }

      await Message.deleteMany({ roomId: room._id });

      res.json({
         message: "Chat cleared",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

};