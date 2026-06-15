// const express = require("express");

// const router = express.Router();

// const Video = require("../models/Video");


// // ADD VIDEO
// router.post("/add", async (req, res) => {
//    try {
//       const { courseId, title, videoUrl } =
//          req.body;

//       const video = await Video.create({
//          courseId,
//          title,
//          videoUrl,
//       });

//       res.status(201).json({
//          message: "Video added successfully",
//          video,
//       });
//    } catch (error) {
//       console.log(error);

//       res.status(500).json({
//          message: "Server Error",
//       });
//    }
// });


// // GET VIDEOS BY COURSE
// router.get("/:courseId", async (req, res) => {
//    try {
//       const videos = await Video.find({
//          courseId: req.params.courseId,
//       });

//       res.status(200).json(videos);
//    } catch (error) {
//       console.log(error);

//       res.status(500).json({
//          message: "Server Error",
//       });
//    }
// });


// // MARK COMPLETE
// router.put("/complete/:id", async (req, res) => {
//    try {
//       const video = await Video.findByIdAndUpdate(
//          req.params.id,
//          {
//             completed: true,
//          },
//          { new: true }
//       );

//       res.status(200).json({
//          message: "Video completed",
//          video,
//       });
//    } catch (error) {
//       console.log(error);

//       res.status(500).json({
//          message: "Server Error",
//       });
//    }
// });

// module.exports = router;



import express from "express";
import Video from "../models/Video.js";

const router = express.Router();


// ADD VIDEO
router.post("/add", async (req, res) => {
   try {
      const { courseId, title, videoUrl } =
         req.body;

      const video = await Video.create({
         courseId,
         title,
         videoUrl,
      });

      res.status(201).json({
         message: "Video added successfully",
         video,
      });

   } catch (error) {
      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });
   }
});


// GET VIDEOS BY COURSE
router.get("/:courseId", async (req, res) => {
   try {
      const videos = await Video.find({
         courseId: req.params.courseId,
      });

      res.status(200).json(videos);

   } catch (error) {
      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });
   }
});


// MARK COMPLETE
router.put("/complete/:id", async (req, res) => {
   try {
      const video = await Video.findByIdAndUpdate(
         req.params.id,
         {
            completed: true,
         },
         { new: true }
      );

      res.status(200).json({
         message: "Video completed",
         video,
      });

   } catch (error) {
      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });
   }
});


// DELETE VIDEO
router.delete("/:videoId", async (req, res) => {
   try {
      await Video.findByIdAndDelete(
         req.params.videoId
      );

      res.status(200).json({
         message: "Video deleted successfully",
      });

   } catch (error) {
      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });
   }
});

export default router;