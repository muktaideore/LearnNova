import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CoursePage() {
   const { id } = useParams();

   const [course, setCourse] = useState(null);

   useEffect(() => {
      fetchCourse();
   }, []);

   const fetchCourse = async () => {
      try {
         const response = await axios.get(
            `http://localhost:5000/api/course/${id}`
         );

         setCourse(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   if (!course) {
      return <h1>Loading...</h1>;
   }

   return (
      <div className="p-10">
         <h1 className="text-3xl font-bold mb-5">
            {course.title}
         </h1>

         <a
            href={course.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-500 text-white px-6 py-3 rounded"
         >
            Watch Video
         </a>
      </div>
   );
}

export default CoursePage;