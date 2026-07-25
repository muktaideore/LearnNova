

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import socketHandler from "./socket.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import studyCalendarRoutes from "./routes/studyCalendarRoutes.js";
import groupStudyRoutes from "./routes/groupStudyRoutes.js";
import invitationRoutes from "./routes/invitationRoutes.js";
import groupVideoRoutes from "./routes/groupVideoRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import roomNoteRoutes from "./routes/roomNoteRoutes.js";
dotenv.config();

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS =", process.env.EMAIL_PASS);

const app = express();
app.use(cors({
   origin: [
      "http://localhost:5173",
      "https://learnnova-o8gz.onrender.com",
   ],
   credentials: true,
}));

app.use(express.json());
app.use("/api/payment", paymentRoutes);
// ==============================
// Middleware
// ==============================

// ...
app.use("/api/room-notes", roomNoteRoutes);
// app.use(cors());

// app.use(express.json());

// ==============================
// Static Folder
// ==============================

app.use("/uploads", express.static("uploads"));

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/course", courseRoutes);

app.use("/api/video", videoRoutes);

// app.use("/api/note", noteRoutes);
app.use("/api/notes", noteRoutes);

app.use("/api/bookmark", bookmarkRoutes);

app.use("/api/streak", streakRoutes);

app.use("/api/stats", statsRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/certificate", certificateRoutes);

app.use("/api/study-calendar", studyCalendarRoutes);

app.use("/api/group-study", groupStudyRoutes);

app.use("/api/group-study", groupStudyRoutes);

app.use("/api/invitation", invitationRoutes);

app.use("/api/group-video", groupVideoRoutes);
// ==============================
// Test Routes
// ==============================
app.use(
   "/api/invitation",
   invitationRoutes
);
app.get("/", (req, res) => {
   res.send("Learnify Backend Running 🚀");
});

app.get("/api/test", (req, res) => {
   res.send("Test Route Working ✅");
});

// ==============================
// HTTP Server
// ==============================

const server = http.createServer(app);

// ==============================
// Socket.IO
// ==============================

// const io = new Server(server, {
//    cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST", "PUT", "DELETE"],
//    },
// });
const io = new Server(server, {
   cors: {
      origin: [
         "http://localhost:5173",
         "https://learnnova-o8gz.onrender.com",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
   },
});

socketHandler(io);

// ==============================
// MongoDB Connection
// ==============================

mongoose
   .connect(process.env.MONGO_URI)
   .then(() => {

      console.log("✅ MongoDB Connected");

      const PORT = process.env.PORT || 5000;

      server.listen(PORT, () => {

         console.log(`🚀 Server running on port ${PORT}`);

      });

   })
   .catch((err) => {

      console.log("❌ MongoDB Connection Error");

      console.log(err);

   });