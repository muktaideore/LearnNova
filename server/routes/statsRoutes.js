import express from "express";
import Course from "../models/Course.js";
import Video from "../models/Video.js";
import Note from "../models/Note.js";
import Bookmark from "../models/Bookmark.js";
import protect from "../middleware/authMiddleware.js";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", protect, async (req, res) => {
   try {

      const courses = await Course.find({
         userId: req.user.id,
      });

      const courseIds = courses.map(
         (course) => course._id
      );

      const videos = await Video.find({
         courseId: {
            $in: courseIds,
         },
      });

      const videoIds = videos.map(
         (video) => video._id
      );

      const totalCourses = courses.length;

      const totalVideos = videos.length;

      const completedVideos =
         videos.filter(
            (video) => video.completed
         ).length;

      const totalNotes =
         await Note.countDocuments({
            videoId: {
               $in: videoIds,
            },
         });

      const totalBookmarks =
         await Bookmark.countDocuments({
            userId: req.user.id,
         });

      const progress =
         totalVideos > 0
            ? Math.round(
                 (completedVideos /
                    totalVideos) *
                    100
              )
            : 0;

      res.status(200).json({
         totalCourses,
         totalVideos,
         completedVideos,
         totalNotes,
         totalBookmarks,
         progress,
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
});

export default router;