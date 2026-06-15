

// import { Link } from "react-router-dom";
// import axios from "axios";

// function CourseCard({ course, fetchCourses }) {

//    const handleDelete = async () => {
//       try {

//          await axios.delete(
//             `http://localhost:5000/api/course/${course._id}`
//          );

//          fetchCourses();

//       } catch (error) {
//          console.log(error);
//       }
//    };

//    return (
//       <div className="bg-white p-4 rounded-lg shadow">

//          <img
//    src={
//       course.thumbnail ||
//       "https://via.placeholder.com/300"
//    }
//    alt={course.title}
//    className="w-full h-48 object-cover rounded"
// />
//          <h2 className="text-xl font-bold mt-3">
//             {course.title}
//          </h2>

//          <div className="flex gap-3 mt-3">

//             <Link
//                to={`/course/${course._id}`}
//                className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//                Watch Video
//             </Link>

//             <button
//                onClick={handleDelete}
//                className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//                Delete
//             </button>

//          </div>
//       </div>
//    );
// }

// export default CourseCard;


import { Link } from "react-router-dom";
import axios from "axios";

function CourseCard({ course, fetchCourses }) {

   const handleDelete = async () => {

      try {

         const token = localStorage.getItem("token");

         await axios.delete(
            `http://localhost:5000/api/course/${course._id}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         fetchCourses();

      } catch (error) {

         console.log(error);
      }
   };

   return (
      <div className="bg-white p-4 rounded-lg shadow">

         <img
            src={
               course.thumbnail ||
               "https://via.placeholder.com/300"
            }
            alt={course.title}
            className="w-full h-48 object-cover rounded"
         />

         <h2 className="text-xl font-bold mt-3">
            {course.title}
         </h2>

         <div className="flex gap-3 mt-3">

            <Link
               to={`/course/${course._id}`}
               className="bg-blue-500 text-white px-4 py-2 rounded"
            >
               Watch Video
            </Link>

            <button
               onClick={handleDelete}
               className="bg-red-500 text-white px-4 py-2 rounded"
            >
               Delete
            </button>

         </div>
      </div>
   );
}

export default CourseCard;