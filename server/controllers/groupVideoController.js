
import GroupVideo from "../models/GroupVideo.js";
import GroupStudy from "../models/GroupStudy.js";
// ======================================
// Add Video
// ======================================
export const addVideo = async (req, res) => {
   try {

      const { roomId, videoId, title } = req.body;

      const count = await GroupVideo.countDocuments({
         roomId,
      });

      const video = await GroupVideo.create({
         roomId,
         videoId,
         title,
         addedBy: req.user.id,
         order: count + 1,
      });

      res.status(201).json(video);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }
};

// ======================================
// Get Playlist
// ======================================
export const getPlaylist = async (req, res) => {

   try {

      const videos = await GroupVideo.find({
         roomId: req.params.roomId,
      })
      .populate("addedBy", "name")
      .sort({ order: 1 });

      res.json(videos);

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error",
      });

   }

};

// ======================================
// Delete Video
// ======================================
export const deleteVideo = async (req, res) => {

   try {

      const video = await GroupVideo.findById(req.params.id);

      if (!video) {
         return res.status(404).json({
            message: "Video not found",
         });
      }

      const room = await GroupStudy.findById(video.roomId);

      const isHost = room?.host?.toString() === req.user.id;
      const isUploader = video.addedBy?.toString() === req.user.id;

      if (!isHost && !isUploader) {
         return res.status(403).json({
            message: "Not authorized to delete this video",
         });
      }

      await video.deleteOne();

      res.json({
         message: "Video Deleted"
      });

   } catch (error) {

      console.log(error);

      res.status(500).json({
         message: "Server Error"
      });

   }

};