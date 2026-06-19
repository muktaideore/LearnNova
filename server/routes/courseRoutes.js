


import express from "express";
import Course from "../models/Course.js";

const router = express.Router();
import protect from "../middleware/authMiddleware.js";
// Get All Courses
// Get Logged In User Courses
router.get("/", protect, async (req, res) => {
   try {

      const courses = await Course.find({
         userId: req.user.id,
      });

      res.status(200).json(courses);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });
   }
});

// Get Single Course
router.get("/:id", async (req, res) => {
   try {
      const course = await Course.findById(req.params.id);

      if (!course) {
         return res.status(404).json({
            message: "Course not found",
         });
      }

      res.status(200).json(course);
   } catch (error) {
      res.status(500).json({
         message: "Server Error",
      });
   }
});

// Add Course
router.post("/add",protect, async (req, res) => {

   try {

      const { title, videoUrl } = req.body;

      let videoId = "";

      // Normal URL
      if (videoUrl.includes("v=")) {

         videoId = videoUrl
            .split("v=")[1]
            .split("&")[0];
      }

      // Short URL
      else if (videoUrl.includes("youtu.be/")) {

         videoId = videoUrl
            .split("youtu.be/")[1]
            .split("?")[0];
      }

      const thumbnail =
         `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
console.log(req.body);
      const course = await Course.create({
         title,
         videoUrl,
         thumbnail,
         userId: req.user.id,
      });

      res.status(201).json({
         message: "Course added successfully",
         course,
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });
   }
});
// Delete Course
// Delete Course
router.delete("/:id", protect, async (req, res) => {

   try {

      const course = await Course.findOneAndDelete({
         _id: req.params.id,
         userId: req.user.id,
      });

      if (!course) {
         return res.status(404).json({
            message: "Course not found",
         });
      }

      res.json({
         message: "Course deleted successfully",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });
   }
});
export default router;

