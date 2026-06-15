// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import authRoutes from "./routes/authRoutes.js";
// import courseRoutes from "./routes/courseRoutes.js";
// const videoRoutes = require("./routes/videoRoutes");
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/course", courseRoutes);
// app.use("/api/video", videoRoutes);
// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Learnify Backend Running");
// });

// // Port
// const PORT = process.env.PORT || 5000;

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/note", noteRoutes);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/video", videoRoutes);

// MongoDB Connection
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {
      console.log("MongoDB Connected");
   })
   .catch((err) => {
      console.log(err);
   });

// Test Route
app.get("/", (req, res) => {
   res.send("Learnify Backend Running");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
   console.log(
      `Server running on port ${PORT}`
   );
});