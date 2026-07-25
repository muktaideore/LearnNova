


// import { useEffect, useState } from "react";
// import API from "../services/api";

// import StudyLineChart from "../components/StudyLineChart";
// import StudyBarChart from "../components/StudyBarChart";
// import StudyPieChart from "../components/StudyPieChart";
// import AnalyticsTable from "../components/AnalyticsTable";

// function Analytics() {
//    const [stats, setStats] = useState({
//       totalCourses: 0,
//       totalVideos: 0,
//       completedVideos: 0,
//       totalNotes: 0,
//       totalBookmarks: 0,

//       currentStreak: 0,
//       longestStreak: 0,

//       totalStudyTime: 0,
//       totalSessions: 0,
//       averageSession: 0,
//       longestSession: 0,

//       todayStudy: 0,
//       weekStudy: 0,
//       monthStudy: 0,

//       progress: 0,

//       weeklyData: [],
//       monthlyData: [],
//       courseData: [],
//       recentSessions: [],
//    });

//    useEffect(() => {
//       fetchAnalytics();
//    }, []);

//    const fetchAnalytics = async () => {
//       try {
//          // IMPORTANT
//          const res = await API.get("/analytics");

//          console.log("Analytics Response:", res.data);

//          setStats({
//             totalCourses: res.data.totalCourses || 0,
//             totalVideos: res.data.totalVideos || 0,
//             completedVideos: res.data.completedVideos || 0,
//             totalNotes: res.data.totalNotes || 0,
//             totalBookmarks: res.data.totalBookmarks || 0,

//             currentStreak: res.data.currentStreak || 0,
//             longestStreak: res.data.longestStreak || 0,

//             totalStudyTime: res.data.totalStudyTime || 0,
//             totalSessions: res.data.totalSessions || 0,
//             averageSession: res.data.averageSession || 0,
//             longestSession: res.data.longestSession || 0,

//             todayStudy: res.data.todayStudy || 0,
//             weekStudy: res.data.weekStudy || 0,
//             monthStudy: res.data.monthStudy || 0,

//             progress: res.data.progress || 0,

//             weeklyData: res.data.weeklyData || [],
//             monthlyData: res.data.monthlyData || [],
//             courseData: res.data.courseData || [],
//             recentSessions: res.data.recentSessions || [],
//          });
//       } catch (error) {
//          console.log("Analytics Error:", error);
//       }
//    };

//    return (
//       <div className="min-h-screen bg-gray-100 p-8">

//          <h1 className="text-4xl font-bold mb-8">
//             📊 Analytics Dashboard
//          </h1>

//          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

//             <Card title="📅 Today Study" value={`${stats.todayStudy} min`} />

//             <Card title="📆 This Week" value={`${stats.weekStudy} min`} />

//             <Card title="🗓 This Month" value={`${stats.monthStudy} min`} />

//             <Card title="⏱ Total Study" value={`${stats.totalStudyTime} min`} />

//             <Card title="📚 Courses" value={stats.totalCourses} />

//             <Card title="🎥 Videos" value={stats.totalVideos} />

//             <Card title="✅ Completed Videos" value={stats.completedVideos} />

//             <Card title="📝 Notes" value={stats.totalNotes} />

//             <Card title="🔖 Bookmarks" value={stats.totalBookmarks} />

//             <Card title="🔥 Current Streak" value={`${stats.currentStreak} Days`} />

//             <Card title="🏆 Longest Streak" value={`${stats.longestStreak} Days`} />

//             <Card title="📈 Progress" value={`${stats.progress}%`} />

//             <Card title="📖 Sessions" value={stats.totalSessions} />

//             <Card title="⚡ Avg Session" value={`${stats.averageSession} min`} />

//             <Card title="💪 Longest Session" value={`${stats.longestSession} min`} />

//          </div>

//          <div className="grid lg:grid-cols-2 gap-8 mb-8">

//             <StudyLineChart
//                data={stats.weeklyData}
//             />

//             <StudyBarChart
//                data={stats.monthlyData}
//             />

//          </div>

//          <div className="mb-8">

//             <StudyPieChart
//                data={stats.courseData}
//             />

//          </div>

//          <AnalyticsTable
//             sessions={stats.recentSessions}
//          />

//       </div>
//    );
// }

// function Card({ title, value }) {
//    return (
//       <div className="bg-white rounded-xl shadow p-5">

//          <h2 className="text-gray-500 text-sm">
//             {title}
//          </h2>

//          <p className="text-3xl font-bold mt-3">
//             {value}
//          </p>

//       </div>
//    );
// }

// export default Analytics;


import { useEffect, useState } from "react";
import API from "../services/api";

import StudyLineChart from "../components/StudyLineChart";
import StudyBarChart from "../components/StudyBarChart";
import StudyPieChart from "../components/StudyPieChart";
import AnalyticsTable from "../components/AnalyticsTable";


function Analytics() {

   const [stats, setStats] = useState({

      totalCourses: 0,
      totalVideos: 0,
      completedVideos: 0,
      totalNotes: 0,
      totalBookmarks: 0,

      currentStreak: 0,
      longestStreak: 0,

      totalStudyTime: 0,
      totalSessions: 0,
      averageSession: 0,
      longestSession: 0,

      todayStudy: 0,
      weekStudy: 0,
      monthStudy: 0,

      progress: 0,

      weeklyData: [],
      monthlyData: [],
      courseData: [],
      recentSessions: [],

   });


   useEffect(() => {

      fetchAnalytics();

   }, []);


   const fetchAnalytics = async () => {

      try {

         const res = await API.get("/analytics");

         console.log(
            "Analytics Response:",
            res.data
         );


         setStats({

            totalCourses:
               res.data.totalCourses || 0,

            totalVideos:
               res.data.totalVideos || 0,

            completedVideos:
               res.data.completedVideos || 0,

            totalNotes:
               res.data.totalNotes || 0,

            totalBookmarks:
               res.data.totalBookmarks || 0,


            currentStreak:
               res.data.currentStreak || 0,

            longestStreak:
               res.data.longestStreak || 0,


            totalStudyTime:
               res.data.totalStudyTime || 0,

            totalSessions:
               res.data.totalSessions || 0,

            averageSession:
               res.data.averageSession || 0,

            longestSession:
               res.data.longestSession || 0,


            todayStudy:
               res.data.todayStudy || 0,

            weekStudy:
               res.data.weekStudy || 0,

            monthStudy:
               res.data.monthStudy || 0,


            progress:
               res.data.progress || 0,


            weeklyData:
               res.data.weeklyData || [],

            monthlyData:
               res.data.monthlyData || [],

            courseData:
               res.data.courseData || [],

            recentSessions:
               res.data.recentSessions || [],

         });

      }

      catch (error) {

         console.log(
            "Analytics Error:",
            error
         );

      }

   };


   return (

      <div className="
         min-h-screen
         bg-base-200
         text-base-content
         p-4
         sm:p-6
         lg:p-8
      ">


         {/* Header */}

         <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            mb-8
         ">

            <div>

               <h1 className="
                  text-3xl
                  sm:text-4xl
                  font-bold
                  text-primary
               ">

                  📊 Analytics Dashboard

               </h1>


               <p className="
                  text-base-content/60
                  mt-2
               ">

                  Track your learning progress and study activity.

               </p>

            </div>


            <div className="
               badge
               badge-primary
               badge-lg
            ">

               📈 Learning Progress

            </div>

         </div>


         {/* Statistics Cards */}

         <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
            mb-8
         ">


            <Card
               title="📅 Today Study"
               value={`${stats.todayStudy} min`}
               icon="📅"
            />


            <Card
               title="📆 This Week"
               value={`${stats.weekStudy} min`}
               icon="📆"
            />


            <Card
               title="🗓 This Month"
               value={`${stats.monthStudy} min`}
               icon="🗓"
            />


            <Card
               title="⏱ Total Study"
               value={`${stats.totalStudyTime} min`}
               icon="⏱"
            />


            <Card
               title="📚 Courses"
               value={stats.totalCourses}
               icon="📚"
            />


            <Card
               title="🎥 Videos"
               value={stats.totalVideos}
               icon="🎥"
            />


            <Card
               title="✅ Completed Videos"
               value={stats.completedVideos}
               icon="✅"
            />


            <Card
               title="📝 Notes"
               value={stats.totalNotes}
               icon="📝"
            />


            <Card
               title="🔖 Bookmarks"
               value={stats.totalBookmarks}
               icon="🔖"
            />


            <Card
               title="🔥 Current Streak"
               value={`${stats.currentStreak} Days`}
               icon="🔥"
            />


            <Card
               title="🏆 Longest Streak"
               value={`${stats.longestStreak} Days`}
               icon="🏆"
            />


            <Card
               title="📈 Progress"
               value={`${stats.progress}%`}
               icon="📈"
            />


            <Card
               title="📖 Sessions"
               value={stats.totalSessions}
               icon="📖"
            />


            <Card
               title="⚡ Avg Session"
               value={`${stats.averageSession} min`}
               icon="⚡"
            />


            <Card
               title="💪 Longest Session"
               value={`${stats.longestSession} min`}
               icon="💪"
            />

         </div>


         {/* Charts */}

         <div className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            mb-8
         ">


            <div className="
               card
               bg-base-100
               shadow-xl
            ">

               <div className="card-body">

                  <h2 className="
                     card-title
                  ">

                     📈 Weekly Study Activity

                  </h2>


                  <StudyLineChart
                     data={stats.weeklyData}
                  />

               </div>

            </div>


            <div className="
               card
               bg-base-100
               shadow-xl
            ">

               <div className="card-body">

                  <h2 className="
                     card-title
                  ">

                     📊 Monthly Study Activity

                  </h2>


                  <StudyBarChart
                     data={stats.monthlyData}
                  />

               </div>

            </div>

         </div>


         {/* Course Distribution */}

         <div className="
            card
            bg-base-100
            shadow-xl
            mb-8
         ">

            <div className="card-body">

               <h2 className="card-title">

                  🎯 Course Progress Distribution

               </h2>


               <StudyPieChart
                  data={stats.courseData}
               />

            </div>

         </div>


         {/* Recent Sessions */}

         <div className="
            card
            bg-base-100
            shadow-xl
         ">

            <div className="card-body">

               <h2 className="card-title mb-4">

                  🕒 Recent Study Sessions

               </h2>


               <AnalyticsTable
                  sessions={stats.recentSessions}
               />

            </div>

         </div>


      </div>

   );

}


function Card({ title, value, icon }) {

   return (

      <div className="
         card
         bg-base-100
         shadow-lg
         hover:shadow-2xl
         transition-all
         duration-300
         hover:-translate-y-1
      ">

         <div className="card-body p-5">


            <div className="
               flex
               items-center
               justify-between
               gap-3
            ">


               <div>

                  <h2 className="
                     text-sm
                     font-medium
                     text-base-content/60
                  ">

                     {title}

                  </h2>


                  <p className="
                     text-2xl
                     sm:text-3xl
                     font-bold
                     mt-3
                     text-primary
                  ">

                     {value}

                  </p>

               </div>


               <div className="
                  text-3xl
                  opacity-80
               ">

                  {icon}

               </div>

            </div>

         </div>

      </div>

   );

}


export default Analytics;