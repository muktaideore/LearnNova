import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      courseId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Course",
      },

      videoId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Video",
      },

      duration: {
         type: Number,
         default: 0, // minutes
      },

      date: {
         type: Date,
         default: Date.now,
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model(
   "StudySession",
   studySessionSchema
);