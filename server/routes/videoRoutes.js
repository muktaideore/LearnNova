

// import express from "express";
// import Video from "../models/Video.js";
// import protect from "../middleware/authMiddleware.js";
// import updateStreak from "../utils/updateStreak.js";
// import updateStudyTime from "../utils/updateStudyTime.js";
// import StudySession from "../models/StudySession.js";
// import Course from "../models/Course.js";
// import Certificate from "../models/Certificate.js";
// const router = express.Router();


// // ===============================
// // ADD VIDEO
// // ===============================
// router.post("/add", async (req, res) => {
//    try {

//       const {
//          courseId,
//          title,
//          videoUrl,
//       } = req.body;

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


// // ===============================
// // GET VIDEOS BY COURSE
// // ===============================
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


// // ===============================
// // MARK VIDEO COMPLETE
// // ===============================
// router.put(
//    "/complete/:id",
//    protect,
//    async (req, res) => {

//       try {

//          const video = await Video.findById(req.params.id);

//          if (!video) {

//             return res.status(404).json({
//                message: "Video not found",
//             });

//          }

//          if (video.completed) {

//             return res.status(200).json({
//                message: "Video already completed",
//                video,
//             });

//          }

//          video.completed = true;

//          await video.save();

//          res.status(200).json({

//             message: "Video completed successfully",

//             video,

//          });

//       } catch (error) {

//          console.log(error);

//          res.status(500).json({

//             message: "Server Error",

//          });

//       }

//    }
// );




// // ===============================
// // DELETE VIDEO
// // ===============================
// router.delete("/:videoId", async (req, res) => {

//    try {

//       await Video.findByIdAndDelete(req.params.videoId);

//       res.status(200).json({

//          message: "Video deleted successfully",

//       });

//    } catch (error) {

//       console.log(error);

//       res.status(500).json({

//          message: "Server Error",

//       });

//    }

// });


// // ===============================
// // WATCH VIDEO
// // ===============================
// router.put(
//    "/watch/:id",
//    protect,
//    async (req, res) => {

//       try {

//          const video = await Video.findById(req.params.id);

//          if (!video) {

//             return res.status(404).json({
//                message: "Video not found",
//             });

//          }

//          const now = new Date();

//          video.lastWatched = now;

//          await video.save();

//          // Update Daily Streak
//          await updateStreak(req.user.id);

//          // Prevent duplicate study session within 30 minutes
//          const lastSession = await StudySession
//             .findOne({
//                userId: req.user.id,
//                videoId: video._id,
//             })
//             .sort({ createdAt: -1 });

//          if (
//             !lastSession ||
//             (now - lastSession.createdAt) >
//                (30 * 60 * 1000)
//          ) {

//             await updateStudyTime(
//                req.user.id,
//                video._id,
//                30
//             );

//          }
//          // =====================================
// // CHECK IF COURSE IS COMPLETED
// // =====================================

// // =====================================
// // CHECK COURSE COMPLETION
// // =====================================

// const totalVideos = await Video.countDocuments({
//    courseId: video.courseId,
// });

// const completedVideos = await Video.countDocuments({
//    courseId: video.courseId,
//    completed: true,
// });

// console.log("Total Videos:", totalVideos);
// console.log("Completed Videos:", completedVideos);

// if (
//    totalVideos > 0 &&
//    totalVideos === completedVideos
// ) {

//    const existingCertificate =
//       await Certificate.findOne({
//          userId: req.user.id,
//          courseId: video.courseId,
//       });

//    if (!existingCertificate) {

//       const certificateId =
//          "LF-" + Date.now();

//       await Certificate.create({
//          userId: req.user.id,
//          courseId: video.courseId,
//          certificateId,
//       });

//       console.log("🏆 Certificate Generated");

//    }

// }
         

//          res.status(200).json({

//             message: "Watch history updated",

//          });

//       } catch (error) {

//          console.log(error);

//          res.status(500).json({

//             message: "Server Error",

//          });

//       }

//    }
// );

// export default router;

import express from "express";
import Video from "../models/Video.js";
import protect from "../middleware/authMiddleware.js";
import updateStreak from "../utils/updateStreak.js";
import updateStudyTime from "../utils/updateStudyTime.js";
import StudySession from "../models/StudySession.js";
import Certificate from "../models/Certificate.js";

const router = express.Router();


// ====================================
// ADD VIDEO
// ====================================
router.post("/add", async (req, res) => {
   try {

      const { courseId, title, videoUrl } = req.body;

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


// ====================================
// GET VIDEOS OF COURSE
// ====================================
router.get("/:courseId", async (req, res) => {

   try {

      const videos = await Video.find({
         courseId: req.params.courseId,
      });

      res.json(videos);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

});


// ====================================
// COMPLETE VIDEO
// ====================================
router.put(
   "/complete/:id",
   protect,
   async (req, res) => {

      try {

         const video = await Video.findById(req.params.id);

         if (!video) {

            return res.status(404).json({
               message: "Video not found",
            });

         }

         if (!video.completed) {

            video.completed = true;
            await video.save();

         }

         await updateStreak(req.user.id);

         await updateStudyTime(
            req.user.id,
            video._id,
            30
         );

         // ==========================
         // COURSE COMPLETION
         // ==========================

         const totalVideos =
            await Video.countDocuments({
               courseId: video.courseId,
            });

         const completedVideos =
            await Video.countDocuments({
               courseId: video.courseId,
               completed: true,
            });

         console.log("Total Videos:", totalVideos);
         console.log("Completed Videos:", completedVideos);

         if (
            totalVideos > 0 &&
            totalVideos === completedVideos
         ) {

            const existingCertificate =
               await Certificate.findOne({

                  userId: req.user.id,

                  courseId: video.courseId,

               });

            if (!existingCertificate) {

               const certificateId =
                  "LF-" + Date.now();

               await Certificate.create({

                  userId: req.user.id,

                  courseId: video.courseId,

                  certificateId,

               });

               console.log("🏆 Certificate Generated");

            }

         }

         res.status(200).json({

            message: "Video completed successfully",

            video,

         });

      } catch (error) {

         console.log(error);

         res.status(500).json({

            message: "Server Error",

         });

      }

   }
);


// ====================================
// DELETE VIDEO
// ====================================
router.delete("/:videoId", async (req, res) => {

   try {

      await Video.findByIdAndDelete(
         req.params.videoId
      );

      res.json({

         message: "Video deleted successfully",

      });

   } catch (error) {

      console.log(error);

      res.status(500).json({

         message: "Server Error",

      });

   }

});


// ====================================
// WATCH VIDEO
// ====================================
router.put(
   "/watch/:id",
   protect,
   async (req, res) => {

      try {

         const video =
            await Video.findById(req.params.id);

         if (!video) {

            return res.status(404).json({
               message: "Video not found",
            });

         }

         const now = new Date();

         video.lastWatched = now;

         await video.save();

         await updateStreak(req.user.id);

         const lastSession =
            await StudySession.findOne({

               userId: req.user.id,

               videoId: video._id,

            }).sort({
               createdAt: -1,
            });

         if (
            !lastSession ||
            now - lastSession.createdAt >
               30 * 60 * 1000
         ) {

            await updateStudyTime(
               req.user.id,
               video._id,
               30
            );

         }

         res.status(200).json({

            message: "Watch history updated",

         });

      } catch (error) {

         console.log(error);

         res.status(500).json({

            message: "Server Error",

         });

      }

   }
);

export default router;