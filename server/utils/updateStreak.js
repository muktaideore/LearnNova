import Streak from "../models/Streak.js";

const updateStreak = async (userId) => {
   try {

      console.log("========== UPDATE STREAK ==========");
      console.log("User ID:", userId);

      let streak = await Streak.findOne({ userId });

      console.log("Existing Streak:", streak);

      if (!streak) {
         streak = await Streak.create({
            userId,
         });

         console.log("New streak document created");
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lastStudy = streak.lastStudyDate
         ? new Date(streak.lastStudyDate)
         : null;

      console.log("Today:", today);

      if (lastStudy) {

         lastStudy.setHours(0, 0, 0, 0);

         console.log("Last Study:", lastStudy);

         const diffDays =
            (today - lastStudy) /
            (1000 * 60 * 60 * 24);

         console.log("Difference in Days:", diffDays);

         // Already studied today
         if (diffDays === 0) {

            console.log("Already studied today");

            return;
         }

         // Consecutive day
         if (diffDays === 1) {

            streak.currentStreak += 1;

            console.log("Incrementing streak");

         } else {

            // Missed a day
            streak.currentStreak = 1;

            console.log("Resetting streak");

         }

      } else {

         streak.currentStreak = 1;

         console.log("First study session");

      }

      if (
         streak.currentStreak >
         streak.longestStreak
      ) {

         streak.longestStreak =
            streak.currentStreak;

      }

      streak.lastStudyDate = today;

      await streak.save();

      console.log("Saved Successfully");
      console.log("Current:", streak.currentStreak);
      console.log("Longest:", streak.longestStreak);
      console.log("==================================");

   } catch (error) {

      console.log("Update Streak Error:", error);

   }
};

export default updateStreak;