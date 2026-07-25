

// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useParams } from "react-router-dom";

// import AddVideo from "../components/AddVideo";
// import Notes from "../components/Notes";

// function CourseDetails() {
//    const { id } = useParams();

//    const [videos, setVideos] = useState([]);
//    const [currentVideo, setCurrentVideo] =
//       useState(null);

//    useEffect(() => {
//       fetchVideos();
//    }, []);

//    // Fetch Videos
//    const fetchVideos = async () => {
//       try {
//          const response = await API.get(
//             `/video/${id}`
//          );

//          setVideos(response.data);

// const sortedVideos =
//    [...response.data].sort(
//       (a, b) =>
//          new Date(
//             b.lastWatched || 0
//          ) -
//          new Date(
//             a.lastWatched || 0
//          )
//    );

// if (sortedVideos.length > 0) {

//    if (sortedVideos[0].lastWatched) {

//       setCurrentVideo(
//          sortedVideos[0]
//       );

//    } else {

//       setCurrentVideo(
//          response.data[0]
//       );

//    }

// }

//       } catch (error) {
//          console.log(error);
//       }
//    };

//    // Bookmark Video
//    const toggleBookmark = async (
//       videoId
//    ) => {
//       try {

//          await API.post(
//             `/bookmark/toggle/${videoId}`
//          );

//          alert(
//             "Bookmark Updated"
//          );

//       } catch (error) {

//          console.log(error);

//       }
//    };

//    // Convert YouTube URL → Embed URL
//    const getEmbedUrl = (url) => {

//       let videoId = "";

//       if (url.includes("v=")) {

//          videoId = url
//             .split("v=")[1]
//             .split("&")[0];

//       } else if (
//          url.includes("youtu.be/")
//       ) {

//          videoId = url
//             .split("youtu.be/")[1]
//             .split("?")[0];

//       }

//       return `https://www.youtube.com/embed/${videoId}`;
//    };

//    // Mark Complete
//   const markComplete = async (videoId) => {
//    try {

//       const res = await API.put(
//          `/video/complete/${videoId}`
//       );

//       console.log(res.data);

//       alert("Video marked as completed!");

//       // Refresh videos
//       fetchVideos();

//    } catch (error) {

//       console.log(error);

//       alert("Unable to complete video");

//    }
// };
   

//    const watchVideo = async (video) => {

//    setCurrentVideo(video);

//    try {

//       await API.put(
//          `/video/watch/${video._id}`
//       );

//    } catch (error) {

//       console.log(error);

//    }

// };



//    // Progress
//    const completedVideos =
//       videos.filter(
//          (video) =>
//             video.completed
//       ).length;

//    const progress =
//       videos.length > 0
//          ? (
//               completedVideos /
//               videos.length
//            ) *
//            100
//          : 0;

//    return (
//       <div className="min-h-screen bg-gray-100 p-8">

//          {/* Add Lesson */}
//          <AddVideo
//             courseId={id}
//             fetchVideos={fetchVideos}
//          />

//          {/* Progress Bar */}
//          <div className="bg-white p-4 rounded-lg shadow mb-6">

//             <h2 className="text-2xl font-bold mb-2">
//                Progress:
//                {" "}
//                {progress.toFixed(0)}%
//             </h2>

//             <div className="w-full bg-gray-300 h-4 rounded">

//                <div
//                   className="bg-green-500 h-4 rounded"
//                   style={{
//                      width:
//                         `${progress}%`,
//                   }}
//                ></div>

//             </div>

//          </div>

//          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//             {/* Video Player */}
//             <div className="lg:col-span-2">

//                <div className="bg-white p-4 rounded-lg shadow">

//                   {currentVideo && (
//                      <>
//                         <iframe
//                            width="100%"
//                            height="500"
//                            src={getEmbedUrl(
//                               currentVideo.videoUrl
//                            )}
//                            title="YouTube Video Player"
//                            allowFullScreen
//                            className="rounded-lg"
//                         ></iframe>

//                         <h2 className="text-2xl font-bold mt-4">
//                            {
//                               currentVideo.title
//                            }
//                         </h2>
//                      </>
//                   )}

//                </div>

//                {/* Notes */}
//                {currentVideo && (
//                   <Notes
//                      videoId={
//                         currentVideo._id
//                      }
//                   />
//                )}

//             </div>

//             {/* Sidebar */}
//             <div className="bg-white p-4 rounded-lg shadow">

//                <h2 className="text-2xl font-bold mb-4">
//                   Lessons
//                </h2>

//                {videos.map(
//                   (video) => (

//                      <div
//                         key={
//                            video._id
//                         }
//                         className="border p-3 mb-3 rounded"
//                      >

//                         <h3 className="font-semibold">
//                            {video.title}
//                         </h3>

//                         <div className="flex flex-wrap gap-2 mt-3">

//                            {/* Watch */}
//                            <button
//                               onClick={() =>
//    watchVideo(video)
// }
//                               className="bg-blue-500 text-white px-3 py-1 rounded"
//                            >
//                               Watch
//                            </button>

//                            {/* Bookmark */}
//                            <button
//                               onClick={() =>
//                                  toggleBookmark(
//                                     video._id
//                                  )
//                               }
//                               className="bg-yellow-500 text-white px-3 py-1 rounded"
//                            >
//                               ⭐ Bookmark
//                            </button>

//                            {/* Complete */}
//                            {!video.completed && (
//                               <button
//                                  onClick={() =>
//                                     markComplete(
//                                        video._id
//                                     )
//                                  }
//                                  className="bg-green-500 text-white px-3 py-1 rounded"
//                               >
//                                  Complete
//                               </button>
//                            )}

//                            {/* Done */}
//                            {video.completed && (
//                               <span className="text-green-600 font-bold">
//                                  ✓ Done
//                               </span>
//                            )}

//                         </div>

//                      </div>

//                   )
//                )}

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

   // =========================
   // FETCH VIDEOS
   // =========================

   const fetchVideos = async () => {

      try {

         const response = await API.get(
            `/video/${id}`
         );

         const videoList =
            response.data;

         setVideos(videoList);

         const sortedVideos =
            [...videoList].sort(
               (a, b) =>
                  new Date(
                     b.lastWatched || 0
                  ) -
                  new Date(
                     a.lastWatched || 0
                  )
            );

         if (sortedVideos.length > 0) {

            if (
               sortedVideos[0].lastWatched
            ) {

               setCurrentVideo(
                  sortedVideos[0]
               );

            } else {

               setCurrentVideo(
                  videoList[0]
               );

            }

         }

      } catch (error) {

         console.log(error);

      }

   };

   // =========================
   // YOUTUBE EMBED URL
   // =========================

   const getEmbedUrl = (url) => {

      let videoId = "";

      if (url.includes("v=")) {

         videoId = url
            .split("v=")[1]
            .split("&")[0];

      } else if (
         url.includes("youtu.be/")
      ) {

         videoId = url
            .split("youtu.be/")[1]
            .split("?")[0];

      }

      return `https://www.youtube.com/embed/${videoId}`;

   };

   // =========================
   // WATCH VIDEO
   // =========================

   const watchVideo = async (video) => {

      setCurrentVideo(video);

      try {

         await API.put(
            `/video/watch/${video._id}`
         );

      } catch (error) {

         console.log(error);

      }

   };

   // =========================
   // BOOKMARK
   // =========================

   const toggleBookmark = async (
      videoId
   ) => {

      try {

         await API.post(
            `/bookmark/toggle/${videoId}`
         );

         alert(
            "Bookmark Updated ⭐"
         );

      } catch (error) {

         console.log(error);

      }

   };

   // =========================
   // COMPLETE VIDEO
   // =========================

   const markComplete = async (
      videoId
   ) => {

      try {

         await API.put(
            `/video/complete/${videoId}`
         );

         alert(
            "Video marked as completed! 🎉"
         );

         fetchVideos();

      } catch (error) {

         console.log(error);

         alert(
            "Unable to complete video"
         );

      }

   };

   // =========================
   // PROGRESS
   // =========================

   const completedVideos =
      videos.filter(
         (video) =>
            video.completed
      ).length;

   const progress =
      videos.length > 0
         ? (
              completedVideos /
              videos.length
           ) *
           100
         : 0;

   return (

      <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">

         <div className="max-w-7xl mx-auto">

            {/* ===================== */}
            {/* ADD VIDEO */}
            {/* ===================== */}

            <div className="mb-6">

               <AddVideo
                  courseId={id}
                  fetchVideos={fetchVideos}
               />

            </div>

            {/* ===================== */}
            {/* PROGRESS CARD */}
            {/* ===================== */}

            <div className="card bg-base-100 shadow-xl mb-6">

               <div className="card-body">

                  <div className="flex justify-between items-center mb-3">

                     <h2 className="card-title text-xl md:text-2xl">

                        📈 Course Progress

                     </h2>

                     <span className="badge badge-primary badge-lg">

                        {progress.toFixed(0)}%

                     </span>

                  </div>

                  <progress
                     className="progress progress-primary w-full"
                     value={progress}
                     max="100"
                  ></progress>

                  <p className="text-sm text-base-content/60 mt-2">

                     {completedVideos} of{" "}
                     {videos.length} lessons completed

                  </p>

               </div>

            </div>

            {/* ===================== */}
            {/* MAIN LAYOUT */}
            {/* ===================== */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

               {/* ===================== */}
               {/* VIDEO SECTION */}
               {/* ===================== */}

               <div className="lg:col-span-2">

                  <div className="card bg-base-100 shadow-xl">

                     <div className="card-body p-4 md:p-6">

                        {currentVideo ? (

                           <>

                              {/* VIDEO */}

                              <div className="aspect-video w-full">

                                 <iframe
                                    className="w-full h-full rounded-xl"
                                    src={getEmbedUrl(
                                       currentVideo.videoUrl
                                    )}
                                    title={
                                       currentVideo.title
                                    }
                                    allowFullScreen
                                 ></iframe>

                              </div>

                              {/* VIDEO TITLE */}

                              <h2 className="text-xl md:text-2xl font-bold mt-5">

                                 {currentVideo.title}

                              </h2>

                              {/* STATUS */}

                              <div className="flex flex-wrap gap-2 mt-3">

                                 {currentVideo.completed ? (

                                    <div className="badge badge-success gap-2">

                                       ✓ Completed

                                    </div>

                                 ) : (

                                    <div className="badge badge-warning">

                                       ⏳ In Progress

                                    </div>

                                 )}

                              </div>

                           </>

                        ) : (

                           <div className="flex flex-col items-center justify-center py-20">

                              <div className="text-6xl mb-4">
                                 🎥
                              </div>

                              <h2 className="text-2xl font-bold">

                                 No Video Selected

                              </h2>

                              <p className="text-base-content/60 mt-2">

                                 Select a lesson to start learning.

                              </p>

                           </div>

                        )}

                     </div>

                  </div>

                  {/* NOTES */}

                  {currentVideo && (

                     <div className="card bg-base-100 shadow-xl mt-6">

                        <div className="card-body">

                           <h2 className="card-title">

                              📝 Notes

                           </h2>

                           <Notes
                              videoId={
                                 currentVideo._id
                              }
                           />

                        </div>

                     </div>

                  )}

               </div>

               {/* ===================== */}
               {/* LESSON SIDEBAR */}
               {/* ===================== */}

               <div>

                  <div className="card bg-base-100 shadow-xl">

                     <div className="card-body">

                        <div className="flex justify-between items-center mb-4">

                           <h2 className="card-title">

                              📚 Lessons

                           </h2>

                           <span className="badge badge-primary">

                              {videos.length}

                           </span>

                        </div>

                        <div className="space-y-3 max-h-[700px] overflow-y-auto">

                           {videos.length === 0 ? (

                              <div className="text-center py-10">

                                 <div className="text-4xl mb-3">

                                    📭

                                 </div>

                                 <p className="text-base-content/60">

                                    No lessons added yet.

                                 </p>

                              </div>

                           ) : (

                              videos.map(
                                 (video, index) => (

                                    <div
                                       key={
                                          video._id
                                       }
                                       className={`card border transition-all ${
                                          currentVideo?._id ===
                                          video._id
                                             ? "border-primary bg-primary/10"
                                             : "border-base-300"
                                       }`}
                                    >

                                       <div className="card-body p-4">

                                          <div className="flex gap-3">

                                             <div className="avatar placeholder">

                                                <div className="bg-primary text-primary-content rounded-full w-9 h-9">

                                                   <span>

                                                      {index + 1}

                                                   </span>

                                                </div>

                                             </div>

                                             <div className="flex-1 min-w-0">

                                                <h3 className="font-semibold line-clamp-2">

                                                   {video.title}

                                                </h3>

                                                {video.completed && (

                                                   <div className="badge badge-success badge-sm mt-2">

                                                      ✓ Done

                                                   </div>

                                                )}

                                             </div>

                                          </div>

                                          <div className="flex flex-wrap gap-2 mt-3">

                                             {/* WATCH */}

                                             <button
                                                onClick={() =>
                                                   watchVideo(
                                                      video
                                                   )
                                                }
                                                className="btn btn-primary btn-sm flex-1"
                                             >

                                                ▶ Watch

                                             </button>

                                             {/* BOOKMARK */}

                                             <button
                                                onClick={() =>
                                                   toggleBookmark(
                                                      video._id
                                                   )
                                                }
                                                className="btn btn-warning btn-sm"
                                             >

                                                ⭐

                                             </button>

                                             {/* COMPLETE */}

                                             {!video.completed && (

                                                <button
                                                   onClick={() =>
                                                      markComplete(
                                                         video._id
                                                      )
                                                   }
                                                   className="btn btn-success btn-sm"
                                                >

                                                   ✓

                                                </button>

                                             )}

                                          </div>

                                       </div>

                                    </div>

                                 )
                              )

                           )}

                        </div>

                     </div>

                  </div>

               </div>

            </div>

         </div>

      </div>

   );

}

export default CourseDetails;