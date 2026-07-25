// import mongoose from "mongoose";



//  const playlistItemSchema = new mongoose.Schema(
// {
//    url: {
//       type: String,
//       required: true,
//    },

//    provider: {
//       type: String,
//       required: true,
//    },

//    title: {
//       type: String,
//       default: "",
//    },

//    thumbnail: {
//       type: String,
//       default: "",
//    },

//    duration: {
//       type: Number,
//       default: 0,
//    },

//    addedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//    },

//    addedAt: {
//       type: Date,
//       default: Date.now,
//    },
// },
// {
//    _id: true,
// }
// );

// const groupStudySchema = new mongoose.Schema(
// {
//    roomName: {
//       type: String,
//       required: true,
//    },

//    description: {
//       type: String,
//       default: "",
//    },

//    host: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//    },

//    members: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "User",
//       },
//    ],

//    // ⭐ Playlist
//    playlist: [playlistItemSchema],

//    currentVideo: {
//    url: {
//       type: String,
//       default: "",
//    },

//    provider: {
//       type: String,
//       default: "",
//    },
// },

//    // ⭐ Current playing video index
//    currentVideoIndex: {
//       type: Number,
//       default: 0,
//    },

//    // ⭐ Current playback time
//    currentTime: {
//       type: Number,
//       default: 0,
//    },

//    // ⭐ Playing or paused
//    isPlaying: {
//       type: Boolean,
//       default: false,
//    },

//    isActive: {
//       type: Boolean,
//       default: true,
//    },
// },
// {
//    timestamps: true,
// }
// );
// export default mongoose.model("GroupStudy", groupStudySchema);

import mongoose from "mongoose";

// Playlist Item Schema
const playlistItemSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    provider: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 0,
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  }
);

// Group Study Schema
const groupStudySchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Playlist
    playlist: [playlistItemSchema],

    currentVideo: {
      url: {
        type: String,
        default: "",
      },
      provider: {
        type: String,
        default: "",
      },
    },

    currentVideoIndex: {
      type: Number,
      default: 0,
    },

    currentTime: {
      type: Number,
      default: 0,
    },

    isPlaying: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("GroupStudy", groupStudySchema);