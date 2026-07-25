import express from "express";

import protect from "../middleware/authMiddleware.js";

import Course from "../models/Course.js";
import Video from "../models/Video.js";
import Note from "../models/Note.js";
import Bookmark from "../models/Bookmark.js";
import Streak from "../models/Streak.js";
import StudySession from "../models/StudySession.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {

   try {

      // ==========================
      // BASIC COUNTS
      // ==========================

      const totalCourses =
         await Course.countDocuments();

      const totalVideos =
         await Video.countDocuments();

      const completedVideos =
         await Video.countDocuments({
            completed: true,
         });

      const totalNotes =
         await Note.countDocuments({
            userId: req.user.id,
         });

      const totalBookmarks =
         await Bookmark.countDocuments({
            userId: req.user.id,
         });

      const streak =
         await Streak.findOne({
            userId: req.user.id,
         });

      // ==========================
      // STUDY SESSIONS
      // ==========================

      const sessions =
         await StudySession.find({
            userId: req.user.id,
         })
         .populate("videoId", "title")
         .populate("courseId", "title");
         console.log("Logged User:", req.user.id);
console.log("Sessions:", sessions);

      // ==========================
      // TOTAL STUDY TIME
      // ==========================

      const totalStudyTime =
         sessions.reduce(
            (sum, session) =>
               sum + session.duration,
            0
         );

      const totalSessions =
         sessions.length;

      const averageSession =
         totalSessions > 0
            ? (
                 totalStudyTime /
                 totalSessions
              ).toFixed(1)
            : 0;

      const longestSession =
         totalSessions > 0
            ? Math.max(
                 ...sessions.map(
                    s => s.duration
                 )
              )
            : 0;

      // ==========================
      // TODAY
      // ==========================

      const today = new Date();

      today.setHours(0,0,0,0);

      const todayStudy =
         sessions
         .filter(
            s =>
               new Date(s.date) >=
               today
         )
         .reduce(
            (sum,s)=>
               sum+s.duration,
            0
         );

      // ==========================
      // WEEK
      // ==========================

      const weekAgo =
         new Date();

      weekAgo.setDate(
         weekAgo.getDate()-7
      );

      const weekStudy =
         sessions
         .filter(
            s =>
               new Date(s.date)>=
               weekAgo
         )
         .reduce(
            (sum,s)=>
               sum+s.duration,
            0
         );

      // ==========================
      // MONTH
      // ==========================

      const monthAgo =
         new Date();

      monthAgo.setMonth(
         monthAgo.getMonth()-1
      );

      const monthStudy =
         sessions
         .filter(
            s =>
               new Date(s.date)>=
               monthAgo
         )
         .reduce(
            (sum,s)=>
               sum+s.duration,
            0
         );

      // ==========================
      // PROGRESS
      // ==========================

      const progress =
         totalVideos>0
            ?(
               completedVideos/
               totalVideos
             )*100
            :0;

      // ==========================
      // WEEKLY GRAPH
      // ==========================

      const weekNames = [
         "Sun",
         "Mon",
         "Tue",
         "Wed",
         "Thu",
         "Fri",
         "Sat",
      ];

      const weeklyData =
         weekNames.map(day=>({
            day,
            minutes:0,
         }));

      sessions.forEach(session=>{

         const day =
            new Date(session.date)
            .getDay();

         weeklyData[day]
         .minutes +=
         session.duration;

      });

      // ==========================
      // MONTHLY GRAPH
      // ==========================

      const monthNames = [
         "Jan",
         "Feb",
         "Mar",
         "Apr",
         "May",
         "Jun",
         "Jul",
         "Aug",
         "Sep",
         "Oct",
         "Nov",
         "Dec",
      ];

      const monthlyData =
         monthNames.map(month=>({

            month,

            minutes:0,

         }));

      sessions.forEach(session=>{

         const month =
            new Date(session.date)
            .getMonth();

         monthlyData[month]
         .minutes +=
         session.duration;

      });

      // ==========================
      // COURSE WISE PIE CHART
      // ==========================

      const courseMap = {};

      sessions.forEach(session=>{

         if(!session.courseId)
            return;

         const title =
            session.courseId.title ||
            "Unknown";

         if(!courseMap[title]){

            courseMap[title]=0;

         }

         courseMap[title]+=
            session.duration;

      });

      const courseData =
         Object.keys(courseMap)
         .map(course=>({

            name:course,

            minutes:
               courseMap[course],

         }));

      // ==========================
      // RECENT STUDY SESSIONS
      // ==========================

      const recentSessions =
         sessions

         .sort(
            (a,b)=>

               new Date(b.date)-
               new Date(a.date)

         )

         .slice(0,10)

         .map(session=>({

            video:
               session.videoId?.title ||
               "Unknown Video",

            course:
               session.courseId?.title ||
               "Unknown Course",

            duration:
               session.duration,

            date:
               new Date(session.date)
               .toLocaleDateString(),

         }));

      // ==========================
      // RESPONSE
      // ==========================
console.log({
   totalCourses,
   totalVideos,
   completedVideos,
   totalNotes,
   totalBookmarks,
   currentStreak: streak?.currentStreak || 0,
   longestStreak: streak?.longestStreak || 0,
   totalStudyTime,
   totalSessions,
   averageSession,
   longestSession,
   todayStudy,
   weekStudy,
   monthStudy,
   progress,
   weeklyData,
   monthlyData,
   courseData,
   recentSessions,
});
      res.json({

         totalCourses,

         totalVideos,

         completedVideos,

         totalNotes,

         totalBookmarks,

         currentStreak:
            streak?.currentStreak || 0,

         longestStreak:
            streak?.longestStreak || 0,

         totalStudyTime,

         totalSessions,

         averageSession,

         longestSession,

         todayStudy,

         weekStudy,

         monthStudy,

         progress:
            progress.toFixed(0),

         weeklyData,

         monthlyData,

         courseData,

         recentSessions,

      });

   }

   catch(error){

      console.log(error);

      res.status(500).json({

         message:"Server Error",

      });

   }

});

export default router;