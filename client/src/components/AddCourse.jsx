import { useState } from "react";
// import axios from "axios";
import API from "../services/api";

function AddCourse({ fetchCourses }) {
   const [formData, setFormData] = useState({
      title: "",
      videoUrl: "",
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await API.post(
            "/course/add",
            formData
         );

         alert(response.data.message);

         setFormData({
            title: "",
            videoUrl: "",
         });

         fetchCourses();
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
         <h2 className="text-2xl font-bold mb-4">
            Add Course
         </h2>

         <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
         />

         <input
            type="text"
            name="videoUrl"
            placeholder="YouTube Video URL"
            value={formData.videoUrl}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
         />

         <button className="bg-black text-white px-4 py-2 rounded">
            Add Course
         </button>
      </form>
   );
}

export default AddCourse;