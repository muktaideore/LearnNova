// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//    const navigate = useNavigate();

//    const handleLogout = () => {
//       localStorage.removeItem("token");

//       navigate("/");
//    };

//    return (
//       <div className="p-10">
//          <h1 className="text-3xl font-bold mb-6">
//             Welcome to Learnify Dashboard
//          </h1>

//          <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//          >
//             Logout
//          </button>
//       </div>
//    );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
// import axios from "axios";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

import AddCourse from "../components/AddCourse";
import CourseCard from "../components/CourseCard";

function Dashboard() {

   const navigate = useNavigate();

   const [courses, setCourses] = useState([]);

   // FETCH COURSES
   const fetchCourses = async () => {

      try {

         const response = await API.get(
   "/course"
);

         setCourses(response.data);

      } catch (error) {

         console.log(error);

      }
   };

   // LOAD COURSES
   useEffect(() => {

      fetchCourses();

   }, []);

   // LOGOUT
   const handleLogout = () => {

      localStorage.removeItem("token");

      navigate("/");

   };

   console.log(courses);

   return (

      <div className="min-h-screen bg-gray-100 p-8">

         {/* TOP BAR */}
         <div className="flex justify-between items-center mb-8">

            <h1 className="text-3xl font-bold">
               Learnify Dashboard
            </h1>

            <button
               onClick={handleLogout}
               className="bg-red-500 text-white px-4 py-2 rounded"
            >
               Logout
            </button>

         </div>

         {/* ADD COURSE */}
         <AddCourse fetchCourses={fetchCourses} />

         {/* COURSES */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course) => (

               <CourseCard
                  key={course._id}
                  course={course}
                  fetchCourses={fetchCourses}
               />

            ))}

         </div>

      </div>
   );
}

export default Dashboard;