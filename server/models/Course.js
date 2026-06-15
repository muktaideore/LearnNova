import mongoose from "mongoose";



const courseSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },

      title: {
         type: String,
         required: true,
      },

      videoUrl: {
         type: String,
         required: true,
      },

      thumbnail: {
   type: String,
   default:
      "https://img.youtube.com/vi/tVzUXW6siu0/hqdefault.jpg",
},
   },
   {
      timestamps: true,
   }
   
);

const Course = mongoose.model("Course", courseSchema);

export default Course;

