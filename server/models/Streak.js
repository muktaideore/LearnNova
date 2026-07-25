// import mongoose from "mongoose";

// const streakSchema = new mongoose.Schema({
//    userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//    },

//    currentStreak: {
//       type: Number,
//       default: 0,
//    },

//    longestStreak: {
//       type: Number,
//       default: 0,
//    },

//    lastStudyDate: {
//       type: Date,
//    },
// });

// export default mongoose.model(
//    "Streak",
//    streakSchema
// );
import mongoose from "mongoose";

const streakSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      currentStreak: {
         type: Number,
         default: 0,
      },

      longestStreak: {
         type: Number,
         default: 0,
      },

      lastStudyDate: {
         type: Date,
      },
   },
   {
      timestamps: true,
   }
);

export default mongoose.model(
   "Streak",
   streakSchema
);