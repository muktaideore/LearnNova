import StudySession from "../models/StudySession.js";
import Video from "../models/Video.js";

const updateStudyTime = async (
   userId,
   videoId,
   minutes = 30
) => {

   try {

      const video =
         await Video.findById(videoId);

      if (!video) return;

      await StudySession.create({

         userId,

         courseId: video.courseId,

         videoId,

         duration: minutes,

      });

   } catch (error) {

      console.log(error);

   }

};

export default updateStudyTime;