
// import { useEffect, useState } from "react";

// import axios from "axios";
// import Notes from "../components/Notes";
// import { useParams } from "react-router-dom";

// import AddVideo from "../components/AddVideo";

// function CourseDetails() {
//    const { id } = useParams();

//    const [videos, setVideos] = useState([]);

//    const [currentVideo, setCurrentVideo] =
//       useState(null);

//    useEffect(() => {
//       fetchVideos();
//    }, []);

//    const fetchVideos = async () => {
//       try {
//          const response = await axios.get(
//             `http://localhost:5000/api/video/${id}`
//          );

//          setVideos(response.data);

//          if (response.data.length > 0) {
//             setCurrentVideo(response.data[0]);
//          }
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    const getEmbedUrl = (url) => {

//    let videoId = "";

//    // Normal YouTube URL
//    if (url.includes("v=")) {

//       videoId = url
//          .split("v=")[1]
//          .split("&")[0];
//    }

//    // Short YouTube URL
//    else if (url.includes("youtu.be/")) {

//       videoId = url
//          .split("youtu.be/")[1]
//          .split("?")[0];
//    }

//    return `https://www.youtube.com/embed/${videoId}`;
// };

//    const markComplete = async (videoId) => {
//       try {
//          await axios.put(
//             `http://localhost:5000/api/video/complete/${videoId}`
//          );

//          fetchVideos();
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    // Progress Calculation
//    const completedVideos = videos.filter(
//       (video) => video.completed
//    ).length;

//    const progress =
//       videos.length > 0
//          ? (completedVideos / videos.length) * 100
//          : 0;

//    return (
//       <div className="min-h-screen bg-gray-100 p-8">
//          <AddVideo
//             courseId={id}
//             fetchVideos={fetchVideos}
//          />

//          {/* Progress */}
//          <div className="bg-white p-4 rounded-lg shadow mb-6">
//             <h2 className="text-2xl font-bold mb-2">
//                Progress: {progress.toFixed(0)}%
//             </h2>

//             <div className="w-full bg-gray-300 h-4 rounded">
//                <div
//                   className="bg-green-500 h-4 rounded"
//                   style={{
//                      width: `${progress}%`,
//                   }}
//                ></div>
//             </div>
//          </div>

//          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Video Player */}
//             <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow">
//                {currentVideo && (
//                   <iframe
//                      width="100%"
//                      height="500"
//                      src={getEmbedUrl(
//                         currentVideo.videoUrl
//                      )}
//                      title="YouTube video player"
//                      allowFullScreen
//                      className="rounded-lg"
//                   ></iframe>
                  
//                )}
//                <Notes
//    videoId={selectedVideo._id}
// />
//             </div>

//             {/* Playlist Sidebar */}
//             <div className="bg-white p-4 rounded-lg shadow">
//                <h2 className="text-2xl font-bold mb-4">
//                   Lessons
//                </h2>

//                {videos.map((video) => (
//                   <div
//                      key={video._id}
//                      className="border p-3 mb-3 rounded"
//                   >
//                      <h3 className="font-semibold">
//                         {video.title}
//                      </h3>

//                      <div className="flex gap-2 mt-3">
//                         <button
//                            onClick={() =>
//                               setCurrentVideo(video)
//                            }
//                            className="bg-blue-500 text-white px-3 py-1 rounded"
//                         >
//                            Watch
//                         </button>

//                         {!video.completed && (
//                            <button
//                               onClick={() =>
//                                  markComplete(
//                                     video._id
//                                  )
//                               }
//                               className="bg-green-500 text-white px-3 py-1 rounded"
//                            >
//                               Complete
//                            </button>
//                         )}

//                         {video.completed && (
//                            <span className="text-green-600 font-bold">
//                               ✓ Done
//                            </span>
//                         )}
//                      </div>
//                   </div>
//                ))}
//             </div>
//          </div>
//       </div>
//    );
// }

// export default CourseDetails;



import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

import AddVideo from "../components/AddVideo";
import Notes from "../components/Notes";

function CourseDetails() {
   const { id } = useParams();

   const [videos, setVideos] = useState([]);
   const [currentVideo, setCurrentVideo] =
      useState(null);

   useEffect(() => {
      fetchVideos();
   }, []);

   // Fetch Videos
   const fetchVideos = async () => {
      try {
         const response = await API.get(
            `/video/${id}`
         );

         setVideos(response.data);

         if (response.data.length > 0) {
            setCurrentVideo(response.data[0]);
         }

      } catch (error) {
         console.log(error);
      }
   };

   // Convert YouTube URL → Embed URL
   const getEmbedUrl = (url) => {

      let videoId = "";

      // Normal URL
      if (url.includes("v=")) {

         videoId = url
            .split("v=")[1]
            .split("&")[0];

      }

      // Short URL
      else if (url.includes("youtu.be/")) {

         videoId = url
            .split("youtu.be/")[1]
            .split("?")[0];

      }

      return `https://www.youtube.com/embed/${videoId}`;
   };

   // Mark Video Complete
   const markComplete = async (videoId) => {

      try {

         await API.put(
            `/video/complete/${videoId}`
         );

         fetchVideos();

      } catch (error) {

         console.log(error);

      }
   };

   // Progress Calculation
   const completedVideos = videos.filter(
      (video) => video.completed
   ).length;

   const progress =
      videos.length > 0
         ? (completedVideos / videos.length) * 100
         : 0;

   return (
      <div className="min-h-screen bg-gray-100 p-8">

         {/* Add Lesson */}
         <AddVideo
            courseId={id}
            fetchVideos={fetchVideos}
         />

         {/* Progress Bar */}
         <div className="bg-white p-4 rounded-lg shadow mb-6">

            <h2 className="text-2xl font-bold mb-2">
               Progress: {progress.toFixed(0)}%
            </h2>

            <div className="w-full bg-gray-300 h-4 rounded">

               <div
                  className="bg-green-500 h-4 rounded"
                  style={{
                     width: `${progress}%`,
                  }}
               ></div>

            </div>

         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Video Player */}
            <div className="lg:col-span-2">

               <div className="bg-white p-4 rounded-lg shadow">

                  {currentVideo && (
                     <>
                        <iframe
                           width="100%"
                           height="500"
                           src={getEmbedUrl(
                              currentVideo.videoUrl
                           )}
                           title="YouTube Video Player"
                           allowFullScreen
                           className="rounded-lg"
                        ></iframe>

                        <h2 className="text-2xl font-bold mt-4">
                           {currentVideo.title}
                        </h2>
                     </>
                  )}

               </div>

               {/* Notes Section */}
               {currentVideo && (
                  <Notes
                     videoId={currentVideo._id}
                  />
               )}

            </div>

            {/* Playlist Sidebar */}
            <div className="bg-white p-4 rounded-lg shadow">

               <h2 className="text-2xl font-bold mb-4">
                  Lessons
               </h2>

               {videos.map((video) => (

                  <div
                     key={video._id}
                     className="border p-3 mb-3 rounded"
                  >

                     <h3 className="font-semibold">
                        {video.title}
                     </h3>

                     <div className="flex gap-2 mt-3">

                        <button
                           onClick={() =>
                              setCurrentVideo(video)
                           }
                           className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                           Watch
                        </button>

                        {!video.completed && (
                           <button
                              onClick={() =>
                                 markComplete(
                                    video._id
                                 )
                              }
                              className="bg-green-500 text-white px-3 py-1 rounded"
                           >
                              Complete
                           </button>
                        )}

                        {video.completed && (
                           <span className="text-green-600 font-bold">
                              ✓ Done
                           </span>
                        )}

                     </div>

                  </div>

               ))}

            </div>

         </div>

      </div>
   );
}

export default CourseDetails;