


import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
{
   courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
   },

   title: {
      type: String,
      required: true,
   },

   videoUrl: {
      type: String,
      required: true,
   },

   completed: {
      type: Boolean,
      default: false,
   },

   lastWatched: {
      type: Date,
      default: null,
   },
},
{
   timestamps: true,
}
);

const Video = mongoose.model(
   "Video",
   videoSchema
);

export default Video;