import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      courseId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Course",
         required: true,
      },

      certificateId: {
         type: String,
         required: true,
         unique: true,
      },

      issuedDate: {
         type: Date,
         default: Date.now,
      },
   },
   {
      timestamps: true,
   }
);

const Certificate =
   mongoose.models.Certificate ||
   mongoose.model("Certificate", certificateSchema);

export default Certificate;