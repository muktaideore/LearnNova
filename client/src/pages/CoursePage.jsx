// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function CoursePage() {
//    const { id } = useParams();

//    const [course, setCourse] = useState(null);

//    useEffect(() => {
//       fetchCourse();
//    }, []);

//    const fetchCourse = async () => {
//       try {
//          const response = await axios.get(
//             `http://localhost:5000/api/course/${id}`
//          );

//          setCourse(response.data);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    if (!course) {
//       return <h1>Loading...</h1>;
//    }

//    return (
//       <div className="p-10">
//          <h1 className="text-3xl font-bold mb-5">
//             {course.title}
//          </h1>

//          <a
//             href={course.videoUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="bg-blue-500 text-white px-6 py-3 rounded"
//          >
//             Watch Video
//          </a>
//       </div>
//    );
// }

// export default CoursePage;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CoursePage() {

   const { id } = useParams();

   const [course, setCourse] =
      useState(null);

   useEffect(() => {

      fetchCourse();

   }, [id]);

   const fetchCourse = async () => {

      try {

         const response =
            await axios.get(
               `http://localhost:5000/api/course/${id}`
            );

         setCourse(response.data);

      } catch (error) {

         console.log(error);

      }

   };

   if (!course) {

      return (

         <div className="min-h-screen flex items-center justify-center bg-base-200">

            <span className="loading loading-spinner loading-lg text-primary"></span>

         </div>

      );

   }

   return (

      <div className="min-h-screen bg-base-200">

         {/* ===================== */}
         {/* HERO SECTION */}
         {/* ===================== */}

         <div className="hero min-h-[70vh] bg-base-200">

            <div className="hero-content flex-col lg:flex-row-reverse gap-10 max-w-6xl">

               {/* Course Image */}

               <div className="w-full lg:w-1/2">

                  {course.thumbnail ? (

                     <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="rounded-2xl shadow-2xl w-full object-cover"
                     />

                  ) : (

                     <div className="bg-primary/10 rounded-2xl h-72 flex items-center justify-center">

                        <span className="text-8xl">
                           📚
                        </span>

                     </div>

                  )}

               </div>

               {/* Course Details */}

               <div className="w-full lg:w-1/2">

                  <div className="badge badge-primary badge-lg mb-4">

                     🎓 Learnify Course

                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold">

                     {course.title}

                  </h1>

                  <p className="py-6 text-base-content/70 text-lg">

                     {course.description ||
                        "Start learning and improve your skills with Learnify."}

                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">

                     <div className="badge badge-outline badge-lg">

                        🎥 Video Course

                     </div>

                     <div className="badge badge-outline badge-lg">

                        📖 Learn at Your Pace

                     </div>

                     <div className="badge badge-outline badge-lg">

                        🚀 Skill Development

                     </div>

                  </div>

                  <div className="flex flex-wrap gap-3">

                     <a
                        href={course.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-lg"
                     >

                        ▶ Watch Video

                     </a>

                     <button
                        className="btn btn-outline btn-lg"
                        onClick={() =>
                           window.history.back()
                        }
                     >

                        ← Back

                     </button>

                  </div>

               </div>

            </div>

         </div>

         {/* ===================== */}
         {/* COURSE INFORMATION */}
         {/* ===================== */}

         <div className="max-w-6xl mx-auto px-4 pb-12">

            <div className="divider">

               COURSE INFORMATION

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

               <div className="card bg-base-100 shadow-xl">

                  <div className="card-body items-center text-center">

                     <div className="text-4xl">
                        🎥
                     </div>

                     <h2 className="card-title">

                        Video Learning

                     </h2>

                     <p className="text-base-content/60">

                        Learn through carefully selected video lessons.

                     </p>

                  </div>

               </div>

               <div className="card bg-base-100 shadow-xl">

                  <div className="card-body items-center text-center">

                     <div className="text-4xl">
                        📈
                     </div>

                     <h2 className="card-title">

                        Track Progress

                     </h2>

                     <p className="text-base-content/60">

                        Monitor your learning progress with Learnify.

                     </p>

                  </div>

               </div>

               <div className="card bg-base-100 shadow-xl">

                  <div className="card-body items-center text-center">

                     <div className="text-4xl">
                        🏆
                     </div>

                     <h2 className="card-title">

                        Earn Certificates

                     </h2>

                     <p className="text-base-content/60">

                        Complete your learning journey and earn certificates.

                     </p>

                  </div>

               </div>

            </div>

         </div>

      </div>

   );

}

export default CoursePage;