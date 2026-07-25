import express from "express";
import Bookmark from "../models/Bookmark.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post(
   "/toggle/:videoId",
   protect,
   async (req, res) => {

      const existing =
         await Bookmark.findOne({
            userId: req.user.id,
            videoId: req.params.videoId,
         });

      if (existing) {

         await existing.deleteOne();

         return res.json({
            message:
               "Bookmark removed",
         });
      }

      await Bookmark.create({
         userId: req.user.id,
         videoId: req.params.videoId,
      });

      res.json({
         message:
            "Bookmark added",
      });
   }
);
router.get(
   "/",
   protect,
   async (req, res) => {
const bookmarks =
   await Bookmark.find({
      userId: req.user.id,
   }).populate({
      path: "videoId",
      populate: {
         path: "courseId",
      },
   });

res.json(bookmarks);

      res.json(bookmarks);
   }
);
export default router;