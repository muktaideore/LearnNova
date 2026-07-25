import express from "express";
import protect from "../middleware/authMiddleware.js";
import StudySession from "../models/StudySession.js";

const router = express.Router();

// =======================================
// GET STUDY CALENDAR DATA
// =======================================
router.get("/", protect, async (req, res) => {
   try {

      const sessions = await StudySession.find({
         userId: req.user.id,
      });

      const calendar = {};

      sessions.forEach((session) => {

         const date = new Date(session.date)
            .toISOString()
            .split("T")[0];

         if (!calendar[date]) {
            calendar[date] = 0;
         }

         calendar[date] += session.duration;

      });

      const result = Object.keys(calendar).map((date) => ({
         date,
         minutes: calendar[date],
      }));

      res.status(200).json(result);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
});

export default router;