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