// import express from "express";
// import bcrypt from "bcryptjs";

// import User from "../models/User.js";

// const router = express.Router();

// // Register User
// router.post("/register", async (req, res) => {
//    try {
//       const { name, email, password } = req.body;

//       // Check if user already exists
//       const existingUser = await User.findOne({ email });

//       if (existingUser) {
//          return res.status(400).json({
//             message: "User already exists",
//          });
//       }

//       // Hash Password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Create User
//       const user = await User.create({
//          name,
//          email,
//          password: hashedPassword,
//       });

//       res.status(201).json({
//          message: "User registered successfully",
//          user,
//       });

//    } catch (error) {
//       console.log(error);

//       res.status(500).json({
//          message: "Server Error",
//       });
//    }
// });

// export default router;
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
   try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({
            message: "User already exists",
         });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
         name,
         email,
         password: hashedPassword,
      });

    //   res.status(201).json({
    //      message: "User registered successfully",
    //      user,
    //   });

    res.status(201).json({
   message: "User registered successfully",
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

// Login User
// router.post("/login", async (req, res) => {
//    try {
//       const { email, password } = req.body;

//       const user = await User.findOne({ email });

//       if (!user) {
//          const token = jwt.sign(
//    {
//       id: user._id,
//    },
//    process.env.JWT_SECRET,
//    {
//       expiresIn: "7d",
//    }
// );
//          return res.status(400).json({
//             message: "User not found",
//          });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//          const token = jwt.sign(
//    {
//       id: user._id,
//    },
//    process.env.JWT_SECRET,
//    {
//       expiresIn: "7d",
//    }
// );
//          return res.status(400).json({
//             message: "Invalid credentials",
//          });
//       }

//     //   res.status(200).json({
//     //      message: "Login successful",
//     //      user,
//     //   });
//  res.status(200).json({
//    message: "Login successful",

//    token,

//    user: {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//    },
// });

//    } catch (error) {
//       console.log(error);

//       res.status(500).json({
//          message: "Server Error",
//       });
//    }
// });
router.post("/login", async (req, res) => {

   try {

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({
            message: "User not found",
         });
      }

      const isMatch = await bcrypt.compare(
         password,
         user.password
      );

      if (!isMatch) {
         return res.status(400).json({
            message: "Invalid credentials",
         });
      }

      // GENERATE JWT TOKEN
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

export default router;