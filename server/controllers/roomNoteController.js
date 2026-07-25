import RoomNote from "../models/RoomNote.js";

// ==========================================
// GET NOTES FOR A ROOM
// ==========================================
export const getRoomNotes = async (req, res) => {
  try {
    const note = await RoomNote.findOne({ roomId: req.params.roomId });
    res.json(note || { notes: "" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================================
// SAVE / UPDATE NOTES FOR A ROOM
// ==========================================
export const saveRoomNotes = async (req, res) => {
  try {
    const { roomId, notes } = req.body;

    const updated = await RoomNote.findOneAndUpdate(
      { roomId },
      { notes, updatedBy: req.user.id },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};