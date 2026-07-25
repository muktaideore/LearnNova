// import express from "express";
// import User from "../models/User.js";
// import protect from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/profile", protect, async (req, res) => {

//    try {

//       const user = await User.findById(
//          req.user.id
//       ).select("-password");

//       res.json(user);

//    } catch (error) {

//       console.log(error);

//       res.status(500).json({
//          message: "Server Error",
//       });

//    }

// });

// export default router;


import express from "express";
import multer from "multer";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "uploads/");
   },

   filename: (req, file, cb) => {
      cb(
         null,
         Date.now() +
            "-" +
            file.originalname
      );
   },
});

const upload = multer({
   storage,
});

// GET PROFILE
router.get(
   "/profile",
   protect,
   async (req, res) => {
      try {

         const user =
            await User.findById(
               req.user.id
            ).select("-password");

         res.json(user);

      } catch (error) {

         console.log(error);

         res.status(500).json({
            message: "Server Error",
         });

      }
   }
);

// UPLOAD PHOTO
router.post(
   "/upload-photo",
   protect,
   upload.single("profilePic"),
   async (req, res) => {

      try {

         const user =
            await User.findById(
               req.user.id
            );

         user.profilePic =
            req.file.filename;

         await user.save();

         res.json({
            message:
               "Profile photo uploaded",
            profilePic:
               req.file.filename,
         });

      } catch (error) {

         console.log(error);

         res.status(500).json({
            message: "Server Error",
         });

      }
   }
);

// DELETE PROFILE PHOTO
router.delete(
   "/delete-photo",
   protect,
   async (req, res) => {

      try {

         const user =
            await User.findById(
               req.user.id
            );

         user.profilePic = "";

         await user.save();

         res.json({
            message:
               "Profile photo deleted",
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