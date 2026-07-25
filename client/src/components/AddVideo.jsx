// import { useState } from "react";
// // import axios from "axios";
// import API from "../services/api";

// function AddVideo({ courseId, fetchVideos }) {
//    const [formData, setFormData] = useState({
//       title: "",
//       videoUrl: "",
//    });

//    const handleChange = (e) => {
//       setFormData({
//          ...formData,
//          [e.target.name]: e.target.value,
//       });
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();

//       // Validation
//       if (
//          !formData.title ||
//          !formData.videoUrl
//       ) {
//          alert("Please fill all fields");
//          return;
//       }

//       try {
//          await API.post(
//    "/video/add",
//    {
//       courseId,
//       ...formData,
//    }
// );

//          // Clear Form
//          setFormData({
//             title: "",
//             videoUrl: "",
//          });

//          // Refresh Videos
//          fetchVideos();

//          alert("Lesson Added Successfully");

//       } catch (error) {
//          console.log(error);

//          alert("Failed to add lesson");
//       }
//    };

//    return (
//       <form
//          onSubmit={handleSubmit}
//          className="bg-white p-4 rounded-lg shadow mb-6"
//       >
//          <h2 className="text-xl font-bold mb-4">
//             Add Lesson
//          </h2>

//          {/* Lesson Title */}
//          <input
//             type="text"
//             name="title"
//             placeholder="Lesson Title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="border p-2 w-full mb-4 rounded"
//          />

//          {/* YouTube URL */}
//          <input
//             type="text"
//             name="videoUrl"
//             placeholder="YouTube Video URL"
//             value={formData.videoUrl}
//             onChange={handleChange}
//             required
//             className="border p-2 w-full mb-4 rounded"
//          />

//          {/* Submit Button */}
//          <button
//             type="submit"
//             className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//          >
//             Add Lesson
//          </button>
//       </form>
//    );
// }

// export default AddVideo;

import { useState } from "react";
// import axios from "axios";
import API from "../services/api";

function AddVideo({ courseId, fetchVideos }) {
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

      // Validation
      if (
         !formData.title ||
         !formData.videoUrl
      ) {
         alert("Please fill all fields");
         return;
      }

      try {
         await API.post(
            "/video/add",
            {
               courseId,
               ...formData,
            }
         );

         // Clear Form
         setFormData({
            title: "",
            videoUrl: "",
         });

         // Refresh Videos
         fetchVideos();

         alert("Lesson Added Successfully");

      } catch (error) {
         console.log(error);

         alert("Failed to add lesson");
      }
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="card bg-base-100 shadow-xl p-4 sm:p-6 mb-6"
      >

         <h2 className="text-xl font-bold mb-4 text-base-content">

            Add Lesson

         </h2>

         {/* Lesson Title */}
         <input
            type="text"
            name="title"
            placeholder="Lesson Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full mb-4"
         />

         {/* YouTube URL */}
         <input
            type="text"
            name="videoUrl"
            placeholder="YouTube Video URL"
            value={formData.videoUrl}
            onChange={handleChange}
            required
            className="input input-bordered w-full mb-4"
         />

         {/* Submit Button */}
         <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
         >

            Add Lesson

         </button>

      </form>
   );
}

export default AddVideo;