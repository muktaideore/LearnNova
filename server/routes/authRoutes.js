





import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();


// REGISTER USER
router.post("/register", async (req, res) => {
   try {

      const { name, email, password } = req.body;
      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await User.findOne({
         email: normalizedEmail,
      });

      // Block only if a VERIFIED account already exists
      if (existingUser && existingUser.isVerified) {
         return res.status(400).json({
            message: "User already exists",
         });
      }

      const hashedPassword = await bcrypt.hash(
         password,
         10
      );

      const otp = Math.floor(
         100000 + Math.random() * 900000
      ).toString();

      let user;

      if (existingUser && !existingUser.isVerified) {
         // Unverified account already exists — refresh it instead of blocking
         existingUser.name = name;
         existingUser.password = hashedPassword;
         existingUser.otp = otp;
         existingUser.otpExpiry = Date.now() + 10 * 60 * 1000;
         user = await existingUser.save();
      } else {
         user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            otp,
            otpExpiry: Date.now() + 10 * 60 * 1000,
            isVerified: false,
         });
      }

     const emailSent = await sendEmail(
         normalizedEmail,
         "Learnova Email Verification",
         `
         <h2>Welcome to Learnova</h2>
         <p>Your OTP is:</p>
         <h1>${otp}</h1>
         <p>Valid for 10 minutes.</p>
         `
      );

      if (!emailSent) {
         return res.status(500).json({
            message: "Account created but failed to send OTP email. Please try registering again to resend.",
         });
      }

      res.status(201).json({
         message: "OTP sent to your email",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
});

// RESEND OTP
router.post("/resend-otp", async (req, res) => {
   try {

      const { email } = req.body;
      const normalizedEmail = email.trim().toLowerCase();

      const user = await User.findOne({ email: normalizedEmail });

      if (!user) {
         return res.status(404).json({
            message: "User not found",
         });
      }

      if (user.isVerified) {
         return res.status(400).json({
            message: "Account already verified",
         });
      }

      const otp = Math.floor(
         100000 + Math.random() * 900000
      ).toString();

      user.otp = otp;
      user.otpExpiry = Date.now() + 10 * 60 * 1000;
      await user.save();

      await sendEmail(
         normalizedEmail,
         "Learnova Email Verification",
         `
         <h2>Your new OTP</h2>
         <h1>${otp}</h1>
         <p>Valid for 10 minutes.</p>
         `
      );

      res.status(200).json({
         message: "OTP resent to your email",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
});


// VERIFY EMAIL
router.post(
   "/verify-email",
   async (req, res) => {
      try {

         const {
            email,
            otp,
         } = req.body;

         const user =
            await User.findOne({
               email,
            });

         if (!user) {
            return res.status(404).json({
               message:
                  "User not found",
            });
         }

         if (user.otp !== otp) {
            return res.status(400).json({
               message:
                  "Invalid OTP",
            });
         }

         if (
            user.otpExpiry <
            Date.now()
         ) {
            return res.status(400).json({
               message:
                  "OTP expired",
            });
         }

         user.isVerified = true;
         user.otp = null;
         user.otpExpiry = null;

         await user.save();

         res.status(200).json({
            message:
               "Email verified successfully",
         });

      } catch (error) {

         console.log(error);

         res.status(500).json({
            message:
               "Server Error",
         });

      }
   }
);


// LOGIN USER

router.post("/login", async (req, res) => {

   try {

      console.log("LOGIN REQUEST:", req.body);

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      console.log("USER:", user);

      if (!user) {
         return res.status(400).json({
            message: "User not found",
         });
      }

      console.log("VERIFIED:", user.isVerified);

      // rest of your code...

      // EMAIL VERIFICATION CHECK
      if (!user.isVerified) {
         return res.status(400).json({
            message:
               "Please verify your email first",
         });
      }

      const isMatch =
         await bcrypt.compare(
            password,
            user.password
         );

      if (!isMatch) {
         return res.status(400).json({
            message:
               "Invalid credentials",
         });
      }

      const token = jwt.sign(
         {
            id: user._id,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: "7d",
         }
      );

      res.status(200).json({
         message: "Login successful",

         token,

         user: {
            _id: user._id,
            name: user.name,
            email: user.email,
         },
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
   try {

      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
         return res.status(404).json({
            message: "User not found",
         });
      }

      const otp = Math.floor(
         100000 + Math.random() * 900000
      ).toString();

      user.otp = otp;
      user.otpExpiry =
         Date.now() + 10 * 60 * 1000;

      await user.save();

      await sendEmail(
         email,
         "Learnova Password Reset",
         `
         <h2>Password Reset OTP</h2>
         <h1>${otp}</h1>
         <p>Valid for 10 minutes</p>
         `
      );

      res.status(200).json({
         message:
            "Password reset OTP sent",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {

   try {

      const {
         email,
         otp,
         password,
      } = req.body;

      const user =
         await User.findOne({
            email,
         });

      if (!user) {
         return res.status(404).json({
            message: "User not found",
         });
      }

      if (user.otp !== otp) {
         return res.status(400).json({
            message: "Invalid OTP",
         });
      }

      if (
         user.otpExpiry <
         Date.now()
      ) {
         return res.status(400).json({
            message: "OTP expired",
         });
      }

      const hashedPassword =
         await bcrypt.hash(
            password,
            10
         );

      user.password =
         hashedPassword;

      user.otp = null;
      user.otpExpiry = null;

      await user.save();

      res.status(200).json({
         message:
            "Password reset successful",
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
});

export default router;