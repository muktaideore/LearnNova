console.log("✅ certificateRoutes.js Loaded");
import express from "express";
import protect from "../middleware/authMiddleware.js";
import Certificate from "../models/Certificate.js";

const router = express.Router();

// ===============================
// GET ALL CERTIFICATES OF USER
// ===============================

// router.get("/", protect, async (req, res) => {

//    try {

//       const certificates = await Certificate.find({
//          userId: req.user.id,
//       })
//       .populate("courseId", "title")
//       .populate("userId", "name email");

//       res.json(certificates);

//    } catch (error) {

//       console.log(error);

//       res.status(500).json({
//          message: "Server Error",
//       });

//    }

// });
router.get("/", protect, async (req, res) => {
   try {

      console.log("Logged User ID:", req.user.id);

      const certificates = await Certificate.find({
         userId: req.user.id,
      })
      .populate("courseId", "title")
      .populate("userId", "name");

      console.log("Certificates Found:", certificates);

      res.json(certificates);

   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: "Server Error",
      });
   }
});



// ===============================
// GET SINGLE CERTIFICATE
// ===============================

router.get("/:id", protect, async (req, res) => {

   try {

      const certificate =
         await Certificate.findById(req.params.id)
         .populate("courseId", "title")
         .populate("userId", "name email");

      if (!certificate) {

         return res.status(404).json({
            message: "Certificate not found",
         });

      }

      res.json(certificate);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

});

export default router;