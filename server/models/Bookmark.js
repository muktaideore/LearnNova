import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
{
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },

   videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
   },
},
{
   timestamps: true,
}
);

export default mongoose.model(
   "Bookmark",
   bookmarkSchema
);