import { useEffect, useState } from "react";
import API from "../services/api";

function StreakCard() {

   const [streak, setStreak] = useState(null);

   useEffect(() => {
      fetchStreak();
   }, []);

   const fetchStreak = async () => {

      try {

         const response =
            await API.get("/streak");

         setStreak(response.data);

      } catch (error) {

         console.log(error);

      }
   };

   if (!streak) return null;

//    return (
//       <div className="bg-white p-6 rounded-lg shadow mb-6">

//          <h2 className="text-2xl font-bold mb-4">
//             🔥 Study Streak
//          </h2>

//          <p className="text-lg">
//             Current Streak:
//             <span className="font-bold ml-2">
//                {streak.currentStreak} days
//             </span>
//          </p>

//          <p className="text-lg mt-2">
//             Longest Streak:
//             <span className="font-bold ml-2">
//                {streak.longestStreak} days
//             </span>
//          </p>

//       </div>
//    );
// }

// export default StreakCard;
return (
   <div className="card bg-base-100 shadow-xl p-6 mb-6">

      <h2 className="text-2xl font-bold mb-4 text-base-content">

         🔥 Study Streak

      </h2>

      <div className="stats stats-vertical sm:stats-horizontal shadow w-full">

         <div className="stat">

            <div className="stat-title">

               Current Streak

            </div>

            <div className="stat-value text-primary">

               {streak.currentStreak}

            </div>

            <div className="stat-desc">

               days

            </div>

         </div>

         <div className="stat">

            <div className="stat-title">

               Longest Streak

            </div>

            <div className="stat-value text-secondary">

               {streak.longestStreak}

            </div>

            <div className="stat-desc">

               days

            </div>

         </div>

      </div>

   </div>
);

}

export default StreakCard;