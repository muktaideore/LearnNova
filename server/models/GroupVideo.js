import mongoose from "mongoose";

const groupVideoSchema = new mongoose.Schema(
{
   roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupStudy",
      required: true,
   },

   videoId: {
      type: String,
      required: true,
   },

   title: {
      type: String,
      default: "",
   },

   addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },

   order: {
      type: Number,
      default: 0,
   },
},
{
   timestamps: true,
}
);

export default mongoose.model(
   "GroupVideo",
   groupVideoSchema
);