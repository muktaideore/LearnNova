



// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// import AddCourse from "../components/AddCourse";
// import CourseCard from "../components/CourseCard";
// import PomodoroTimer from "../components/PomodoroTimer";

// function Dashboard() {
//    const navigate = useNavigate();

//    const [courses, setCourses] = useState([]);

//    const [streak, setStreak] = useState({
//       currentStreak: 0,
//       longestStreak: 0,
//    });

//    const [stats, setStats] = useState({
//       totalCourses: 0,
//       totalVideos: 0,
//       completedVideos: 0,
//       totalNotes: 0,
//       totalBookmarks: 0,
//       progress: 0,
//    });

//    const fetchCourses = async () => {
//       try {
//          const response = await API.get("/course");
//          setCourses(response.data);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    const fetchStreak = async () => {
//       try {
//          const response = await API.get("/streak");
//          setStreak(response.data);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    const fetchStats = async () => {
//       try {
//          const response = await API.get("/stats");
//          setStats(response.data);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    useEffect(() => {
//       fetchCourses();
//       fetchStreak();
//       fetchStats();
//    }, []);

//    const handleLogout = () => {
//       localStorage.removeItem("token");
//       navigate("/");
//    };

//    return (
//       <div className="min-h-screen bg-[#F4FAFA] text-[#163A3D]">

//          {/* ================= SOFT BACKGROUND ================= */}

//          <div className="pointer-events-none fixed inset-0 overflow-hidden">

//             <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#16838A]/10 blur-[120px]" />

//             <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#8CCFD0]/20 blur-[130px]" />

//             <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#DDF1F1]/60 blur-[120px]" />

//          </div>


//          {/* ================= MAIN CONTENT ================= */}

//          <main className="relative z-10 mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-10 lg:py-8">


//             {/* ================= HEADER ================= */}

//             <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

//                <div className="flex items-center gap-4">

//                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16838A] text-2xl text-white shadow-xl shadow-[#16838A]/20">
//                      ✦
//                   </div>

//                   <div>

//                      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//                         Learnify
//                      </h1>

//                      <p className="mt-1 text-sm text-[#6B8588]">
//                         Your personal learning workspace
//                      </p>

//                   </div>

//                </div>


//                <div className="flex items-center gap-3">

//                   <button
//                      onClick={() => navigate("/profile")}
//                      className="group flex items-center gap-3 rounded-2xl border border-[#CDE4E5] bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#16838A] hover:shadow-lg"
//                   >

//                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4F3F3] text-[#16838A]">
//                         👤
//                      </div>

//                      <div className="hidden text-left sm:block">

//                         <p className="text-sm font-semibold text-[#163A3D]">
//                            My Profile
//                         </p>

//                         <p className="text-xs text-[#789093]">
//                            View account
//                         </p>

//                      </div>

//                   </button>


//                   <button
//                      onClick={handleLogout}
//                      className="rounded-2xl border border-[#F1C7B4] bg-[#FFF8F5] px-4 py-3 text-sm font-semibold text-[#B75E42] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFF0EA] hover:shadow-lg"
//                   >
//                      Logout
//                   </button>

//                </div>

//             </header>


//             {/* ================= HERO ================= */}

//             <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-[#CDE4E5] bg-gradient-to-br from-white via-[#EAF7F7] to-[#C5E5E5] p-6 shadow-xl shadow-[#16838A]/10 sm:p-8 lg:p-10">

//                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#16838A]/15 blur-[90px]" />

//                <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

//                   <div>

//                      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#16838A]">
//                         Your learning journey
//                      </p>

//                      <h2 className="max-w-2xl text-3xl font-black leading-tight text-[#163A3D] sm:text-4xl lg:text-5xl">

//                         Learn something new.

//                         <span className="block bg-gradient-to-r from-[#16838A] via-[#1E9DA3] to-[#55BFC0] bg-clip-text text-transparent">
//                            Every single day.
//                         </span>

//                      </h2>

//                      <p className="mt-4 max-w-xl text-sm leading-6 text-[#668285] sm:text-base">
//                         Organize your courses, track your progress, and build a consistent learning habit.
//                      </p>

//                   </div>


//                   {/* STREAK MINI CARD */}

//                   <div className="flex items-center gap-4 rounded-3xl border border-[#B8DCDD] bg-white/70 p-5 shadow-lg backdrop-blur-xl">

//                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFE4C7] text-3xl shadow-inner">
//                         🔥
//                      </div>

//                      <div>

//                         <p className="text-xs font-bold uppercase tracking-wider text-[#6B8588]">
//                            Current streak
//                         </p>

//                         <p className="mt-1 text-3xl font-black text-[#E18A3D]">
//                            {streak.currentStreak}

//                            <span className="ml-2 text-sm font-normal text-[#789093]">
//                               days
//                            </span>

//                         </p>

//                      </div>

//                   </div>

//                </div>

//             </section>


//             {/* ================= ADD COURSE ================= */}

//             <section className="mb-8 rounded-3xl border border-[#D5E8E9] bg-white p-5 shadow-lg shadow-[#16838A]/5 sm:p-6">

//                <div className="mb-5 flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F3F3] text-xl font-bold text-[#16838A]">
//                      +
//                   </div>

//                   <div>

//                      <h2 className="font-bold text-[#163A3D]">
//                         Add a new course
//                      </h2>

//                      <p className="text-xs text-[#789093]">
//                         Start learning something new
//                      </p>

//                   </div>

//                </div>

//                <AddCourse fetchCourses={fetchCourses} />

//             </section>


//             {/* ================= STATISTICS ================= */}

//             <section className="mb-8">

//                <div className="mb-5 flex items-end justify-between">

//                   <div>

//                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#16838A]">
//                         Overview
//                      </p>

//                      <h2 className="mt-2 text-2xl font-black text-[#163A3D]">
//                         Your learning activity
//                      </h2>

//                   </div>

//                   <span className="hidden text-xs text-[#8AA0A3] sm:block">
//                      Keep growing every day
//                   </span>

//                </div>


//                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">

//                   <StatCard
//                      icon="📚"
//                      title="Courses"
//                      value={stats.totalCourses}
//                      accent="teal"
//                   />

//                   <StatCard
//                      icon="🎥"
//                      title="Videos"
//                      value={stats.totalVideos}
//                      accent="blue"
//                   />

//                   <StatCard
//                      icon="✓"
//                      title="Completed"
//                      value={stats.completedVideos}
//                      accent="green"
//                   />

//                   <StatCard
//                      icon="✎"
//                      title="Notes"
//                      value={stats.totalNotes}
//                      accent="orange"
//                   />

//                   <StatCard
//                      icon="🔖"
//                      title="Bookmarks"
//                      value={stats.totalBookmarks}
//                      accent="purple"
//                   />

//                </div>

//             </section>


//             {/* ================= PROGRESS + STREAK ================= */}

//             <section className="mb-10 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">

//                {/* PROGRESS */}

//                <div className="rounded-3xl border border-[#D5E8E9] bg-white p-6 shadow-lg sm:p-8">

//                   <div className="mb-8 flex items-start justify-between">

//                      <div>

//                         <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#789093]">
//                            Learning progress
//                         </p>

//                         <h2 className="mt-2 text-2xl font-black text-[#163A3D]">
//                            Overall progress
//                         </h2>

//                      </div>


//                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#8CCFD0] bg-[#E4F3F3] text-lg font-black text-[#16838A]">
//                         {stats.progress}%
//                      </div>

//                   </div>


//                   <div className="mb-3 flex justify-between text-sm">

//                      <span className="text-[#789093]">
//                         Progress completed
//                      </span>

//                      <span className="font-semibold text-[#35666A]">
//                         {stats.progress} / 100
//                      </span>

//                   </div>


//                   <div className="h-3 overflow-hidden rounded-full bg-[#E4F0F0]">

//                      <div
//                         className="h-full rounded-full bg-gradient-to-r from-[#16838A] via-[#1E9DA3] to-[#67C9CA] transition-all duration-1000"
//                         style={{
//                            width: `${stats.progress}%`,
//                         }}
//                      />

//                   </div>


//                   <div className="mt-6 grid grid-cols-2 gap-3">

//                      <div className="rounded-2xl border border-[#DCEBEC] bg-[#F6FBFB] p-4">

//                         <p className="text-xs text-[#789093]">
//                            Completed videos
//                         </p>

//                         <p className="mt-2 text-xl font-black text-[#163A3D]">
//                            {stats.completedVideos}
//                         </p>

//                      </div>


//                      <div className="rounded-2xl border border-[#DCEBEC] bg-[#F6FBFB] p-4">

//                         <p className="text-xs text-[#789093]">
//                            Total videos
//                         </p>

//                         <p className="mt-2 text-xl font-black text-[#163A3D]">
//                            {stats.totalVideos}
//                         </p>

//                      </div>

//                   </div>

//                </div>


//                {/* STREAK */}

//                <div className="relative overflow-hidden rounded-3xl border border-[#B8DCDD] bg-gradient-to-br from-[#DDF3F3] via-[#F7FCFC] to-[#C7E7E7] p-6 shadow-lg sm:p-8">

//                   <div className="absolute -right-10 -top-10 text-[9rem] opacity-[0.08]">
//                      🔥
//                   </div>

//                   <div className="relative z-10">

//                      <div className="mb-8 flex items-center gap-4">

//                         <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFE2C4] text-3xl shadow-sm">
//                            🔥
//                         </div>

//                         <div>

//                            <h2 className="text-xl font-black text-[#163A3D]">
//                               Study streak
//                            </h2>

//                            <p className="text-sm text-[#6B8588]">
//                               Consistency is your superpower
//                            </p>

//                         </div>

//                      </div>


//                      <div className="mb-6 grid grid-cols-2 gap-3">

//                         <div className="rounded-2xl border border-[#BFDCDD] bg-white/70 p-4">

//                            <p className="text-xs text-[#789093]">
//                               Current
//                            </p>

//                            <p className="mt-2 text-3xl font-black text-[#E18A3D]">
//                               {streak.currentStreak}
//                            </p>

//                            <p className="text-xs text-[#8AA0A3]">
//                               days
//                            </p>

//                         </div>


//                         <div className="rounded-2xl border border-[#BFDCDD] bg-white/70 p-4">

//                            <p className="text-xs text-[#789093]">
//                               Best record
//                            </p>

//                            <p className="mt-2 text-3xl font-black text-[#16838A]">
//                               {streak.longestStreak}
//                            </p>

//                            <p className="text-xs text-[#8AA0A3]">
//                               days
//                            </p>

//                         </div>

//                      </div>


//                      <p className="text-sm leading-6 text-[#668285]">
//                         Keep showing up. Small daily progress creates remarkable results.
//                      </p>

//                   </div>

//                </div>

//             </section>


//             {/* ================= FOCUS + QUICK ACCESS ================= */}

//             <section className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

//                {/* POMODORO */}

//                <div className="rounded-3xl border border-[#D5E8E9] bg-white p-6 shadow-lg">

//                   <div className="mb-5 flex items-center gap-3">

//                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F3F3] text-xl">
//                         ⏱️
//                      </div>

//                      <div>

//                         <h2 className="font-bold text-[#163A3D]">
//                            Focus session
//                         </h2>

//                         <p className="text-xs text-[#789093]">
//                            Deep work starts here
//                         </p>

//                      </div>

//                   </div>

//                   <PomodoroTimer />

//                </div>


//                {/* QUICK FEATURES */}

//                <div>

//                   <div className="mb-5">

//                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#16838A]">
//                         Explore
//                      </p>

//                      <h2 className="mt-2 text-2xl font-black text-[#163A3D]">
//                         Quick access
//                      </h2>

//                   </div>


//                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

//                      <FeatureCard
//                         icon="📅"
//                         title="Study Calendar"
//                         description="View your learning activity"
//                         accent="teal"
//                         onClick={() => navigate("/study-calendar")}
//                      />

//                      <FeatureCard
//                         icon="📊"
//                         title="Analytics"
//                         description="Understand your progress"
//                         accent="blue"
//                         onClick={() => navigate("/analytics")}
//                      />

//                      <FeatureCard
//                         icon="🏆"
//                         title="Certificates"
//                         description="View your achievements"
//                         accent="orange"
//                         onClick={() => navigate("/certificates")}
//                      />

//                      <FeatureCard
//                         icon="👥"
//                         title="Group Study"
//                         description="Learn together with friends"
//                         accent="purple"
//                         onClick={() => navigate("/group-study")}
//                      />

//                   </div>

//                </div>

//             </section>


//             {/* ================= BOOKMARKS ================= */}

//             <button
//                onClick={() => navigate("/bookmarks")}
//                className="group mb-10 flex w-full items-center justify-between rounded-2xl border border-[#D5E8E9] bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#16838A] hover:shadow-lg"
//             >

//                <div className="flex items-center gap-4">

//                   <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4F3F3] text-xl">
//                      🔖
//                   </div>

//                   <div>

//                      <p className="font-bold text-[#163A3D]">
//                         Saved bookmarks
//                      </p>

//                      <p className="text-sm text-[#789093]">
//                         Revisit the content you saved
//                      </p>

//                   </div>

//                </div>

//                <span className="text-[#8AA0A3] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#16838A]">
//                   →
//                </span>

//             </button>


//             {/* ================= COURSES ================= */}

//             <section>

//                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

//                   <div>

//                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#16838A]">
//                         Your library
//                      </p>

//                      <h2 className="mt-2 text-2xl font-black text-[#163A3D] sm:text-3xl">
//                         My courses
//                      </h2>

//                      <p className="mt-1 text-sm text-[#789093]">
//                         Continue where you left off
//                      </p>

//                   </div>


//                   <div className="w-fit rounded-full border border-[#B8DCDD] bg-[#E4F3F3] px-4 py-2 text-sm font-semibold text-[#16838A]">
//                      {courses.length}{" "}
//                      {courses.length === 1
//                         ? "Course"
//                         : "Courses"}
//                   </div>

//                </div>


//                {courses.length > 0 ? (

//                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

//                      {courses.map((course) => (

//                         <CourseCard
//                            key={course._id}
//                            course={course}
//                            fetchCourses={fetchCourses}
//                         />

//                      ))}

//                   </div>

//                ) : (

//                   <div className="rounded-3xl border border-dashed border-[#BFDCDD] bg-white px-6 py-20 text-center shadow-sm">

//                      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E4F3F3] text-4xl">
//                         📚
//                      </div>

//                      <h2 className="text-2xl font-black text-[#163A3D]">
//                         Your learning library is empty
//                      </h2>

//                      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#789093]">
//                         Add your first course and start building your personalized learning journey.
//                      </p>

//                   </div>

//                )}

//             </section>

//          </main>

//       </div>
//    );
// }


// // ================= STAT CARD =================

// function StatCard({
//    icon,
//    title,
//    value,
//    accent,
// }) {
//    const accentStyles = {
//       teal: "bg-[#E4F3F3] text-[#16838A]",
//       blue: "bg-[#E5EEF5] text-[#4F7890]",
//       green: "bg-[#E3F1E8] text-[#4D8A67]",
//       orange: "bg-[#FFF0DD] text-[#D27C32]",
//       purple: "bg-[#EEE8F7] text-[#7655A6]",
//    };

//    return (

//       <div className="group rounded-3xl border border-[#D5E8E9] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

//          <div className="mb-5 flex items-center justify-between">

//             <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${accentStyles[accent]}`}>
//                {icon}
//             </span>

//             <span className="text-xs text-[#9AAEB0]">
//                Activity
//             </span>

//          </div>

//          <p className="text-3xl font-black tracking-tight text-[#163A3D]">
//             {value}
//          </p>

//          <p className="mt-2 text-sm font-medium text-[#789093]">
//             {title}
//          </p>

//       </div>

//    );
// }


// // ================= FEATURE CARD =================

// function FeatureCard({
//    icon,
//    title,
//    description,
//    accent,
//    onClick,
// }) {
//    const accentStyles = {
//       teal: "hover:border-[#16838A] hover:bg-[#F1FAFA]",
//       blue: "hover:border-[#8AAABD] hover:bg-[#F3F8FB]",
//       orange: "hover:border-[#E0A05C] hover:bg-[#FFF9F1]",
//       purple: "hover:border-[#A78BC9] hover:bg-[#FAF7FE]",
//    };

//    return (

//       <button
//          onClick={onClick}
//          className={`group flex items-center gap-4 rounded-2xl border border-[#D5E8E9] bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${accentStyles[accent]}`}
//       >

//          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E4F3F3] text-xl transition-transform duration-300 group-hover:scale-110">
//             {icon}
//          </div>

//          <div className="min-w-0 flex-1">

//             <h3 className="font-bold text-[#163A3D]">
//                {title}
//             </h3>

//             <p className="mt-1 truncate text-xs text-[#789093]">
//                {description}
//             </p>

//          </div>

//          <span className="text-[#9AAEB0] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#16838A]">
//             →
//          </span>

//       </button>

//    );
// }

// export default Dashboard;



import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import AddCourse from "../components/AddCourse";
import CourseCard from "../components/CourseCard";
import PomodoroTimer from "../components/PomodoroTimer";

function Dashboard() {

   const navigate = useNavigate();

   const [courses, setCourses] = useState([]);

   const [streak, setStreak] = useState({
      currentStreak: 0,
      longestStreak: 0,
   });

   const [stats, setStats] = useState({
      totalCourses: 0,
      totalVideos: 0,
      completedVideos: 0,
      totalNotes: 0,
      totalBookmarks: 0,
      progress: 0,
   });


   // =========================================
   // FETCH COURSES
   // =========================================

   const fetchCourses = async () => {

      try {

         const response = await API.get("/course");

         setCourses(response.data);

      } catch (error) {

         console.log(error);

      }

   };


   // =========================================
   // FETCH STREAK
   // =========================================

   const fetchStreak = async () => {

      try {

         const response = await API.get("/streak");

         setStreak(response.data);

      } catch (error) {

         console.log(error);

      }

   };


   // =========================================
   // FETCH STATS
   // =========================================

   const fetchStats = async () => {

      try {

         const response = await API.get("/stats");

         setStats(response.data);

      } catch (error) {

         console.log(error);

      }

   };


   // =========================================
   // INITIAL DATA
   // =========================================

   useEffect(() => {

      fetchCourses();
      fetchStreak();
      fetchStats();

   }, []);


   // =========================================
   // LOGOUT
   // =========================================

   const handleLogout = () => {

      localStorage.removeItem("token");

      localStorage.removeItem("user");

      navigate("/");

   };


   return (

      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">

         {/* =========================================
             BACKGROUND DECORATION
         ========================================== */}

         <div className="pointer-events-none fixed inset-0 overflow-hidden">

            <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px]" />

            <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-[130px]" />

            <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-500/5 blur-[120px]" />

         </div>


         <main className="relative z-10 mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-10 lg:py-8">


            {/* =========================================
                HEADER
            ========================================== */}

            <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


               {/* BRAND */}

               <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#111827] to-[#3730A3] text-2xl text-white shadow-xl shadow-indigo-900/20">

                     ✦

                  </div>


                  <div>

                     <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">

                        LearnNova

                     </h1>


                     <p className="mt-1 text-sm text-[#64748B]">

                        Your personal learning workspace

                     </p>

                  </div>

               </div>


               {/* ACTIONS */}

               <div className="flex items-center gap-3">


                  {/* PROFILE */}

                  <button

                     onClick={() => navigate("/profile")}

                     className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"

                  >

                     <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                        👤

                     </div>


                     <div className="hidden text-left sm:block">

                        <p className="text-sm font-semibold text-slate-800">

                           My Profile

                        </p>


                        <p className="text-xs text-slate-500">

                           View account

                        </p>

                     </div>

                  </button>


                  {/* LOGOUT */}

                  <button

                     onClick={handleLogout}

                     className="rounded-2xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition-all duration-300 hover:-translate-y-1 hover:bg-red-50 hover:shadow-lg"

                  >

                     Logout

                  </button>

               </div>

            </header>


            {/* =========================================
                HERO
            ========================================== */}

            <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-slate-700 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#3730A3] p-6 shadow-xl shadow-slate-900/10 sm:p-8 lg:p-10">


               <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-[90px]" />

               <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-400/10 blur-[100px]" />


               <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">


                  {/* HERO TEXT */}

                  <div>

                     <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">

                        Your learning journey

                     </p>


                     <h2 className="max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">

                        Learn something new.


                        <span className="block bg-gradient-to-r from-indigo-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">

                           Every single day.

                        </span>

                     </h2>


                     <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">

                        Organize your courses, track your progress, and build a consistent learning habit.

                     </p>

                  </div>


                  {/* STREAK */}

                  <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-lg backdrop-blur-xl">


                     <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/20 text-3xl">

                        🔥

                     </div>


                     <div>

                        <p className="text-xs font-bold uppercase tracking-wider text-slate-300">

                           Current streak

                        </p>


                        <p className="mt-1 text-3xl font-black text-white">

                           {streak.currentStreak}


                           <span className="ml-2 text-sm font-normal text-slate-300">

                              days

                           </span>

                        </p>

                     </div>

                  </div>

               </div>

            </section>


            {/* =========================================
                ADD COURSE
            ========================================== */}

            <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">


               <div className="mb-5 flex items-center gap-3">


                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-xl font-bold text-indigo-600">

                     +

                  </div>


                  <div>

                     <h2 className="font-bold text-slate-800">

                        Add a new course

                     </h2>


                     <p className="text-xs text-slate-500">

                        Start learning something new

                     </p>

                  </div>

               </div>


               <AddCourse fetchCourses={fetchCourses} />

            </section>


            {/* =========================================
                STATISTICS
            ========================================== */}

            <section className="mb-8">


               <div className="mb-5 flex items-end justify-between">


                  <div>

                     <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">

                        Overview

                     </p>


                     <h2 className="mt-2 text-2xl font-black text-slate-900">

                        Your learning activity

                     </h2>

                  </div>


                  <span className="hidden text-xs text-slate-400 sm:block">

                     Keep growing every day

                  </span>

               </div>


               <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">


                  <StatCard
                     icon="📚"
                     title="Courses"
                     value={stats.totalCourses}
                     accent="indigo"
                  />


                  <StatCard
                     icon="🎥"
                     title="Videos"
                     value={stats.totalVideos}
                     accent="blue"
                  />


                  <StatCard
                     icon="✓"
                     title="Completed"
                     value={stats.completedVideos}
                     accent="green"
                  />


                  <StatCard
                     icon="✎"
                     title="Notes"
                     value={stats.totalNotes}
                     accent="amber"
                  />


                  <StatCard
                     icon="🔖"
                     title="Bookmarks"
                     value={stats.totalBookmarks}
                     accent="rose"
                  />

               </div>

            </section>


            {/* =========================================
                PROGRESS + STREAK
            ========================================== */}

            <section className="mb-10 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">


               {/* PROGRESS */}

               <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">


                  <div className="mb-8 flex items-start justify-between">


                     <div>

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">

                           Learning progress

                        </p>


                        <h2 className="mt-2 text-2xl font-black text-slate-900">

                           Overall progress

                        </h2>

                     </div>


                     <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-indigo-200 bg-indigo-50 text-lg font-black text-indigo-600">

                        {stats.progress}%

                     </div>

                  </div>


                  <div className="mb-3 flex justify-between text-sm">


                     <span className="text-slate-500">

                        Progress completed

                     </span>


                     <span className="font-semibold text-slate-700">

                        {stats.progress} / 100

                     </span>

                  </div>


                  <div className="h-3 overflow-hidden rounded-full bg-slate-100">


                     <div

                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 transition-all duration-1000"

                        style={{

                           width: `${stats.progress}%`,

                        }}

                     />

                  </div>


                  <div className="mt-6 grid grid-cols-2 gap-3">


                     <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">


                        <p className="text-xs text-slate-500">

                           Completed videos

                        </p>


                        <p className="mt-2 text-xl font-black text-slate-900">

                           {stats.completedVideos}

                        </p>

                     </div>


                     <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">


                        <p className="text-xs text-slate-500">

                           Total videos

                        </p>


                        <p className="mt-2 text-xl font-black text-slate-900">

                           {stats.totalVideos}

                        </p>

                     </div>

                  </div>

               </div>


               {/* STREAK */}

               <div className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-sm sm:p-8">


                  <div className="absolute -right-10 -top-10 text-[9rem] opacity-[0.08]">

                     🔥

                  </div>


                  <div className="relative z-10">


                     <div className="mb-8 flex items-center gap-4">


                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-3xl">

                           🔥

                        </div>


                        <div>

                           <h2 className="text-xl font-black text-slate-900">

                              Study streak

                           </h2>


                           <p className="text-sm text-slate-500">

                              Consistency is your superpower

                           </p>

                        </div>

                     </div>


                     <div className="mb-6 grid grid-cols-2 gap-3">


                        <div className="rounded-2xl border border-amber-100 bg-white/80 p-4">


                           <p className="text-xs text-slate-500">

                              Current

                           </p>


                           <p className="mt-2 text-3xl font-black text-amber-600">

                              {streak.currentStreak}

                           </p>


                           <p className="text-xs text-slate-500">

                              days

                           </p>

                        </div>


                        <div className="rounded-2xl border border-amber-100 bg-white/80 p-4">


                           <p className="text-xs text-slate-500">

                              Best record

                           </p>


                           <p className="mt-2 text-3xl font-black text-emerald-600">

                              {streak.longestStreak}

                           </p>


                           <p className="text-xs text-slate-500">

                              days

                           </p>

                        </div>

                     </div>


                     <p className="text-sm leading-6 text-slate-600">

                        Keep showing up. Small daily progress creates remarkable results.

                     </p>

                  </div>

               </div>

            </section>


            {/* =========================================
                FOCUS + QUICK ACCESS
            ========================================== */}

            <section className="mb-10 grid items-stretch gap-6 lg:grid-cols-2">


               {/* FOCUS SESSION */}

               <div className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-7">


                  <div className="mb-6 flex items-center gap-3">


                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">

                        ⏱️

                     </div>


                     <div>

                        <h2 className="text-lg font-black text-slate-900">

                           Focus session

                        </h2>


                        <p className="mt-1 text-xs text-slate-500">

                           Deep work starts here

                        </p>

                     </div>

                  </div>


                  <div className="flex flex-1 flex-col justify-center">

                     <PomodoroTimer />

                  </div>

               </div>


               {/* QUICK ACCESS */}

               <div className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-7">


                  <div className="mb-6">


                     <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">

                        Explore

                     </p>


                     <h2 className="mt-2 text-2xl font-black text-slate-900">

                        Quick access

                     </h2>


                     <p className="mt-1 text-sm text-slate-500">

                        Quickly access your learning tools

                     </p>

                  </div>


                  <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">


                     <FeatureCard
                        icon="📅"
                        title="Study Calendar"
                        description="View your learning activity"
                        accent="indigo"
                        onClick={() => navigate("/study-calendar")}
                     />


                     <FeatureCard
                        icon="📊"
                        title="Analytics"
                        description="Understand your progress"
                        accent="blue"
                        onClick={() => navigate("/analytics")}
                     />


                     <FeatureCard
                        icon="🏆"
                        title="Certificates"
                        description="View your achievements"
                        accent="amber"
                        onClick={() => navigate("/certificates")}
                     />


                     <FeatureCard
                        icon="👥"
                        title="Group Study"
                        description="Learn together with friends"
                        accent="purple"
                        onClick={() => navigate("/group-study")}
                     />

                  </div>

               </div>

            </section>


            {/* =========================================
                BOOKMARKS
            ========================================== */}

            <button

               onClick={() => navigate("/bookmarks")}

               className="group mb-10 flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"

            >

               <div className="flex items-center gap-4">


                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">

                     🔖

                  </div>


                  <div>

                     <p className="font-bold text-slate-900">

                        Saved bookmarks

                     </p>


                     <p className="text-sm text-slate-500">

                        Revisit the content you saved

                     </p>

                  </div>

               </div>


               <span className="text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-600">

                  →

               </span>

            </button>


            {/* =========================================
                COURSES
            ========================================== */}

            <section>


               <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">


                  <div>

                     <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">

                        Your library

                     </p>


                     <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">

                        My courses

                     </h2>


                     <p className="mt-1 text-sm text-slate-500">

                        Continue where you left off

                     </p>

                  </div>


                  <div className="w-fit rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">

                     {courses.length}{" "}

                     {courses.length === 1
                        ? "Course"
                        : "Courses"}

                  </div>

               </div>


               {courses.length > 0 ? (

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">


                     {courses.map((course) => (

                        <CourseCard

                           key={course._id}

                           course={course}

                           fetchCourses={fetchCourses}

                        />

                     ))}

                  </div>

               ) : (

                  <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm">


                     <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-4xl">

                        📚

                     </div>


                     <h2 className="text-2xl font-black text-slate-900">

                        Your learning library is empty

                     </h2>


                     <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">

                        Add your first course and start building your personalized learning journey.

                     </p>

                  </div>

               )}

            </section>

         </main>

      </div>

   );

}


// =====================================================
// STAT CARD
// =====================================================

function StatCard({
   icon,
   title,
   value,
   accent,
}) {

   const accentStyles = {

      indigo: {
         icon: "bg-indigo-50 text-indigo-600",
         hover: "hover:border-indigo-300",
      },

      blue: {
         icon: "bg-blue-50 text-blue-600",
         hover: "hover:border-blue-300",
      },

      green: {
         icon: "bg-emerald-50 text-emerald-600",
         hover: "hover:border-emerald-300",
      },

      amber: {
         icon: "bg-amber-50 text-amber-600",
         hover: "hover:border-amber-300",
      },

      rose: {
         icon: "bg-rose-50 text-rose-600",
         hover: "hover:border-rose-300",
      },

      purple: {
         icon: "bg-purple-50 text-purple-600",
         hover: "hover:border-purple-300",
      },

   };


   const currentAccent =
      accentStyles[accent] || accentStyles.indigo;


   return (

      <div

         className={`

            group

            rounded-3xl

            border

            border-slate-200

            bg-white

            p-5

            shadow-sm

            transition-all

            duration-300

            hover:-translate-y-1

            hover:shadow-xl

            ${currentAccent.hover}

         `}

      >


         <div className="mb-5 flex items-center justify-between">


            <div

               className={`

                  flex

                  h-11

                  w-11

                  items-center

                  justify-center

                  rounded-2xl

                  text-xl

                  transition-transform

                  duration-300

                  group-hover:scale-110

                  ${currentAccent.icon}

               `}

            >

               {icon}

            </div>


            <span className="text-xs font-medium text-slate-400">

               Activity

            </span>

         </div>


         <p className="text-3xl font-black tracking-tight text-slate-900">

            {value}

         </p>


         <p className="mt-2 text-sm font-medium text-slate-500">

            {title}

         </p>

      </div>

   );

}


// =====================================================
// FEATURE CARD
// =====================================================

function FeatureCard({

   icon,

   title,

   description,

   accent,

   onClick,

}) {


   const accentStyles = {

      indigo: "hover:border-indigo-300 hover:bg-indigo-50/40",

      blue: "hover:border-blue-300 hover:bg-blue-50/40",

      amber: "hover:border-amber-300 hover:bg-amber-50/40",

      purple: "hover:border-purple-300 hover:bg-purple-50/40",

   };


   const iconStyles = {

      indigo: "bg-indigo-50 text-indigo-600",

      blue: "bg-blue-50 text-blue-600",

      amber: "bg-amber-50 text-amber-600",

      purple: "bg-purple-50 text-purple-600",

   };


   return (

      <button

         onClick={onClick}

         className={`

            group

            flex

            min-h-[150px]

            items-center

            gap-4

            rounded-2xl

            border

            border-slate-200

            bg-slate-50/50

            p-5

            text-left

            shadow-sm

            transition-all

            duration-300

            hover:-translate-y-1

            hover:shadow-lg

            ${accentStyles[accent]}

         `}

      >


         <div

            className={`

               flex

               h-14

               w-14

               shrink-0

               items-center

               justify-center

               rounded-2xl

               text-2xl

               transition-transform

               duration-300

               group-hover:scale-110

               ${iconStyles[accent]}

            `}

         >

            {icon}

         </div>


         <div className="min-w-0 flex-1">


            <h3 className="font-bold text-slate-900">

               {title}

            </h3>


            <p className="mt-2 text-sm leading-5 text-slate-500">

               {description}

            </p>

         </div>


         <span className="text-lg text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-600">

            →

         </span>

      </button>

   );

}


export default Dashboard;