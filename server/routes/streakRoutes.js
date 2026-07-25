import express from "express";
import Streak from "../models/Streak.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get User Streak
router.get("/", protect, async (req, res) => {
   try {
      let streak = await Streak.findOne({
         userId: req.user.id,
      });

      if (!streak) {
         streak = await Streak.create({
            userId: req.user.id,
         });
      }

      res.json(streak);

   } catch (error) {
      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });
      console.log("Logged User:", req.user.id);
      console.log("Found streak:", streak);
   }
});

export default router;