import mongoose from "mongoose";

const roomNoteSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupStudy",
      required: true,
      unique: true,
    },
    notes: {
      type: String,
      default: "",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("RoomNote", roomNoteSchema);