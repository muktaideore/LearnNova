import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
{
   roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupStudy",
      required: true,
   },

   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },

   receiverEmail: {
      type: String,
      required: true,
   },

   status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
   },
},
{
   timestamps: true,
}
);

export default mongoose.model(
   "Invitation",
   invitationSchema
);