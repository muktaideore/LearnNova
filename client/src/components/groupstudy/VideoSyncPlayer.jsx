// import { useState, useEffect, useRef } from "react";
// import YouTube from "react-youtube";
// import API from "../../services/api";
// import socket from "../../socket";

// function VideoSyncPlayer({ room }) {
//    const [videoUrl, setVideoUrl] = useState("");
//    const [videoId, setVideoId] = useState("");
//    const [playlist, setPlaylist] = useState([]);
// const playerRef = useRef(null);
// const syncingRef = useRef(false);

//    // ===============================
//    // Load room data
//    // ===============================
//    useEffect(() => {
//       if (!room?._id) return;

//       loadSavedVideo();
//       fetchPlaylist();
//    }, [room]);

//    // ===============================
//    // Socket Listeners
//    // ===============================
//    useEffect(() => {
//       if (!room?._id) return;

//       // Video Changed
//       socket.on("video-changed", ({ roomId, videoId }) => {
//          if (roomId === room._id) {
//             setVideoId(videoId);
//          }
//       });

//       // Play
// socket.on("video-play", () => {
//    if (!playerRef.current) return;

//    syncingRef.current = true;
//    playerRef.current.playVideo();
// });

// // Pause
// socket.on("video-pause", () => {
//    if (!playerRef.current) return;

//    syncingRef.current = true;
//    playerRef.current.pauseVideo();
// });

// // Seek
// socket.on("video-seek", ({ currentTime }) => {
//    if (!playerRef.current) return;

//    syncingRef.current = true;
//    playerRef.current.seekTo(currentTime, true);
// });

//       return () => {
//          socket.off("video-changed");
//          socket.off("video-play");
//          socket.off("video-pause");
//          socket.off("video-seek");
//       };
//    }, [room]);

//    // ===============================
//    // Load Current Video
//    // ===============================
//    const loadSavedVideo = async () => {
//       try {
//          const res = await API.get(`/group-study/${room._id}`);

//          if (res.data.currentVideoId) {
//             setVideoId(res.data.currentVideoId);
//          }
//       } catch (err) {
//          console.log(err);
//       }
//    };

//    // ===============================
//    // Load Playlist
//    // ===============================
//    const fetchPlaylist = async () => {
//       try {
//          const res = await API.get(`/group-video/${room._id}`);
//          setPlaylist(res.data);
//       } catch (err) {
//          console.log(err);
//       }
//    };

//    // ===============================
//    // Extract Youtube Video ID
//    // ===============================
//    const extractVideoId = (link) => {
//       try {
//          const url = new URL(link);

//          if (url.hostname === "youtu.be") {
//             return url.pathname.slice(1);
//          }

//          if (
//             url.hostname.includes("youtube.com") ||
//             url.hostname.includes("m.youtube.com") ||
//             url.hostname.includes("www.youtube.com")
//          ) {
//             if (url.pathname.startsWith("/shorts/")) {
//                return url.pathname.split("/shorts/")[1];
//             }

//             return url.searchParams.get("v");
//          }

//          return null;
//       } catch {
//          return null;
//       }
//    };

//    // ===============================
//    // Load New Video
//    // ===============================
//    const loadVideo = async () => {
//       if (!videoUrl.trim()) return;

//       const id = extractVideoId(videoUrl);

//       if (!id) {
//          alert("Invalid YouTube URL");
//          return;
//       }

//       try {
//          setVideoId(id);

//          await API.put(`/group-study/${room._id}/video`, {
//             videoId: id,
//          });

//          await API.post("/group-video", {
//             roomId: room._id,
//             videoId: id,
//             title: videoUrl,
//          });

//          await fetchPlaylist();

//          socket.emit("video-loaded", {
//             roomId: room._id,
//             videoId: id,
//          });
//       } catch (err) {
//          console.log(err);
//       }
//    };

//    // ===============================
//    // Play Video From Playlist
//    // ===============================
//    const playVideo = async (video) => {
//       try {
//          setVideoId(video.videoId);

//          await API.put(`/group-study/${room._id}/video`, {
//             videoId: video.videoId,
//          });

//          socket.emit("video-loaded", {
//             roomId: room._id,
//             videoId: video.videoId,
//          });
//       } catch (err) {
//          console.log(err);
//       }
//    };

//    // ===============================
//    // Youtube Ready
//    // ===============================
//    const onReady = (event) => {
//       playerRef.current = event.target;
//    };

//    // ===============================
//    // Play Event
//    // ===============================
//    const onPlay = () => {

//    if (syncingRef.current) {
//       syncingRef.current = false;
//       return;
//    }

//    socket.emit("video-play", {
//       roomId: room._id,
//    });

// };

//    // ===============================
//    // Pause Event
//    // ===============================
//   const onPause = (event) => {

//    if (event.data === 0) return;

//    if (syncingRef.current) {
//       syncingRef.current = false;
//       return;
//    }

//    socket.emit("video-pause", {
//       roomId: room._id,
//    });

// };

//    // ===============================
//    // Seek Event
//    // ===============================
//    const onStateChange = (event) => {

//    if (!playerRef.current) return;

//    // Ignore buffering/unstarted states
//    if (event.data !== 1 && event.data !== 2) return;

//    if (syncingRef.current) return;

//    socket.emit("video-seek", {
//       roomId: room._id,
//       currentTime: playerRef.current.getCurrentTime(),
//    });

// };

//    // ===============================
//    // JSX Starts Below
//    // ===============================
//    return (

//       <div className="bg-white rounded-2xl shadow-lg p-6">

//    <h2 className="text-2xl font-bold mb-6">
//       🎥 Watch Together
//    </h2>

//    {/* ==========================
//         Load Video
//    =========================== */}

//    <div className="flex gap-3 mb-6">

//       <input
//          type="text"
//          value={videoUrl}
//          onChange={(e) => setVideoUrl(e.target.value)}
//          placeholder="Paste YouTube Link..."
//          className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <button
//          onClick={loadVideo}
//          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
//       >
//          Load Video
//       </button>

//    </div>

//    {/* ==========================
//         Playlist
//    =========================== */}

//    <div className="mb-8">

//       <h3 className="text-xl font-semibold mb-4">
//          📃 Playlist
//       </h3>

//       {
//          playlist.length === 0 ? (

//             <div className="bg-gray-100 rounded-lg p-5 text-center text-gray-500">

//                No videos added yet.

//             </div>

//          ) : (

//             <div className="space-y-3">

//                {playlist.map((video, index) => (

//                   <div
//                      key={video._id}
//                      className="border rounded-xl p-4 flex justify-between items-center shadow-sm"
//                   >

//                      <div>

//                         <p className="font-semibold">

//                            {index + 1}. {video.title}

//                         </p>

//                         <p className="text-sm text-gray-500">

//                            Video ID :
//                            {" "}
//                            {video.videoId}

//                         </p>

//                      </div>

//                      <button
//                         onClick={() => playVideo(video)}
//                         className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
//                      >
//                         ▶ Play
//                      </button>

//                   </div>

//                ))}

//             </div>

//          )

//       }

//    </div>

//    {/* ==========================
//         Video Player
//    =========================== */}

//    {
//       videoId ? (
//                   <YouTube
//             videoId={videoId}
//             opts={{
//                width: "100%",
//                height: "500",
//                playerVars: {
//                   autoplay: 0,
//                   rel: 0,
//                   modestbranding: 1,
//                },
//             }}
//             onReady={onReady}
//             onPlay={onPlay}
//             onPause={onPause}
//             onStateChange={onStateChange}
//          />

//       ) : (

//          <div className="h-[500px] rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 text-xl">

//             No Video Loaded

//          </div>

//       )
//    }

// </div>

//    );

// }

// export default VideoSyncPlayer;















import { useState, useEffect, useRef } from "react";
import API from "../../services/api";
import socket from "../../socket";
import VideoPlayer from "../../video/VideoPlayer";

function normalizeToUrl(value) {
   if (!value) return "";

   if (value.includes("://")) {
      return value;
   }

   return `https://www.youtube.com/watch?v=${value}`;
}

function getVideoType(url) {
   if (!url) return "Video";

   if (
      url.includes("youtube.com") ||
      url.includes("youtu.be")
   ) {
      return "YouTube";
   }

   if (url.includes("vimeo.com")) {
      return "Vimeo";
   }

   if (url.includes("drive.google.com")) {
      return "Google Drive";
   }

   if (
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".ogg")
   ) {
      return "MP4";
   }

   return "Video";
}

function VideoSyncPlayer({ room }) {
   const [videoUrl, setVideoUrl] = useState("");
   const [videoTitle, setVideoTitle] = useState("");
   const [videoId, setVideoId] = useState("");
   const [playlist, setPlaylist] = useState([]);
   const [loading, setLoading] = useState(false);

   const playerRef = useRef(null);
   const syncingRef = useRef(false);

   useEffect(() => {
      if (!room?._id) return;

      loadSavedVideo();
      fetchPlaylist();
   }, [room]);

   useEffect(() => {
      if (!room?._id) return;

      const handleVideoChanged = ({
         roomId,
         videoId,
      }) => {
         if (roomId === room._id) {
            setVideoId(videoId);
         }
      };

      const handleVideoPlay = () => {
         if (!playerRef.current) return;

         syncingRef.current = true;
         playerRef.current.playVideo();
      };

      const handleVideoPause = () => {
         if (!playerRef.current) return;

         syncingRef.current = true;
         playerRef.current.pauseVideo();
      };

      const handleVideoSeek = ({ currentTime }) => {
         if (!playerRef.current) return;

         syncingRef.current = true;

         playerRef.current.seekTo(
            currentTime,
            true
         );
      };

      socket.on(
         "video-changed",
         handleVideoChanged
      );

      socket.on(
         "video-play",
         handleVideoPlay
      );

      socket.on(
         "video-pause",
         handleVideoPause
      );

      socket.on(
         "video-seek",
         handleVideoSeek
      );

      return () => {
         socket.off(
            "video-changed",
            handleVideoChanged
         );

         socket.off(
            "video-play",
            handleVideoPlay
         );

         socket.off(
            "video-pause",
            handleVideoPause
         );

         socket.off(
            "video-seek",
            handleVideoSeek
         );
      };
   }, [room]);

   const loadSavedVideo = async () => {
      try {
         const res = await API.get(
            `/group-study/${room._id}`
         );

         if (res.data.currentVideoId) {
            setVideoId(
               res.data.currentVideoId
            );
         }
      } catch (err) {
         console.log(err);
      }
   };

   const fetchPlaylist = async () => {
      try {
         const res = await API.get(
            `/group-video/${room._id}`
         );

         setPlaylist(res.data);
      } catch (err) {
         console.log(err);
      }
   };

   const loadVideo = async () => {
      if (!videoUrl.trim()) {
         alert("Please enter a video URL");
         return;
      }

      if (!videoTitle.trim()) {
         alert("Please enter a video name");
         return;
      }

      try {
         new URL(videoUrl);
      } catch {
         alert("Please enter a valid video URL");
         return;
      }

      try {
         setLoading(true);

         setVideoId(videoUrl);

         await API.put(
            `/group-study/${room._id}/video`,
            {
               videoId: videoUrl,
            }
         );

         await API.post(
            "/group-video",
            {
               roomId: room._id,
               videoId: videoUrl,
               title: videoTitle,
            }
         );

         await fetchPlaylist();

         socket.emit(
            "video-loaded",
            {
               roomId: room._id,
               videoId: videoUrl,
            }
         );

         setVideoUrl("");
         setVideoTitle("");
      } catch (err) {
         console.log(err);

         alert(
            err.response?.data?.message ||
               "Failed to load video"
         );
      } finally {
         setLoading(false);
      }
   };

   const playVideo = async (video) => {
      try {
         setVideoId(video.videoId);

         await API.put(
            `/group-study/${room._id}/video`,
            {
               videoId: video.videoId,
            }
         );

         socket.emit(
            "video-loaded",
            {
               roomId: room._id,
               videoId: video.videoId,
            }
         );
      } catch (err) {
         console.log(err);
      }
   };

   const deleteVideo = async (videoDocId) => {
      try {
         await API.delete(
            `/group-video/${videoDocId}`
         );

         await fetchPlaylist();
      } catch (err) {
         alert(
            err.response?.data?.message ||
               "Failed to delete video"
         );
      }
   };

   const onReady = (event) => {
      playerRef.current = event.target;
   };

   const onPlay = () => {
      if (syncingRef.current) {
         syncingRef.current = false;
         return;
      }

      socket.emit(
         "video-play",
         {
            roomId: room._id,
         }
      );
   };

   const onPause = (event) => {
      if (event.data === 0) return;

      if (syncingRef.current) {
         syncingRef.current = false;
         return;
      }

      socket.emit(
         "video-pause",
         {
            roomId: room._id,
         }
      );
   };

   const onStateChange = (event) => {
      if (!playerRef.current) return;

      if (
         event.data !== 1 &&
         event.data !== 2
      ) {
         return;
      }

      if (syncingRef.current) return;

      socket.emit(
         "video-seek",
         {
            roomId: room._id,
            currentTime:
               playerRef.current.getCurrentTime(),
         }
      );
   };

   return (
      <div className="bg-white p-5 sm:p-6">

         {/* HEADER */}
         <div className="mb-6 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5F5] text-xl">
               🎥
            </div>

            <div>

               <h2 className="text-xl font-bold text-[#163B3D] sm:text-2xl">
                  Watch Together
               </h2>

               <p className="mt-1 text-sm text-slate-500">
                  Watch and control videos together with your group
               </p>

            </div>

         </div>


         {/* ADD VIDEO */}
         <div className="mb-8 rounded-2xl border border-[#B9DDDF] bg-[#F4FAFA] p-4">

            <div className="mb-4 flex items-center gap-2">

               <span className="text-lg text-[#16838A]">
                  ➕
               </span>

               <h3 className="font-bold text-[#163B3D]">
                  Add Video
               </h3>

            </div>


            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_2fr_auto]">

               {/* VIDEO NAME */}
               <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) =>
                     setVideoTitle(
                        e.target.value
                     )
                  }
                  placeholder="Video name"
                  className="rounded-xl border border-[#B9DDDF] bg-white px-4 py-3 text-sm text-[#163B3D] outline-none transition placeholder:text-slate-400 focus:border-[#16838A] focus:ring-4 focus:ring-[#16838A]/10"
               />


               {/* VIDEO URL */}
               <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) =>
                     setVideoUrl(
                        e.target.value
                     )
                  }
                  placeholder="Paste YouTube, Vimeo, Drive or MP4 link"
                  className="rounded-xl border border-[#B9DDDF] bg-white px-4 py-3 text-sm text-[#163B3D] outline-none transition placeholder:text-slate-400 focus:border-[#16838A] focus:ring-4 focus:ring-[#16838A]/10"
               />


               {/* LOAD BUTTON */}
               <button
                  onClick={loadVideo}
                  disabled={loading}
                  className="rounded-xl bg-[#16838A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#116B70] disabled:cursor-not-allowed disabled:opacity-60"
               >
                  {loading ? (

                     <span className="flex items-center justify-center gap-2">

                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                        Adding...

                     </span>

                  ) : (

                     "Add Video"

                  )}

               </button>

            </div>

         </div>


         {/* VIDEO PLAYER */}
         <div className="mb-8">

            <div className="mb-4 flex items-center justify-between">

               <h3 className="text-lg font-bold text-[#163B3D]">
                  ▶ Now Playing
               </h3>

               {videoId && (

                  <span className="rounded-full bg-[#E8F5F5] px-3 py-1 text-xs font-semibold text-[#16838A]">
                     ● Live
                  </span>

               )}

            </div>


            {videoId ? (

               <div className="overflow-hidden rounded-2xl border border-[#B9DDDF] bg-black shadow-sm">

                  <VideoPlayer
                     url={normalizeToUrl(
                        videoId
                     )}
                     onReady={onReady}
                     onPlay={onPlay}
                     onPause={onPause}
                     onStateChange={
                        onStateChange
                     }
                  />

               </div>

            ) : (

               <div className="flex h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#B9DDDF] bg-[#F4FAFA] text-center sm:h-[450px]">

                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F5F5] text-3xl">
                     🎬
                  </div>

                  <h3 className="font-semibold text-[#163B3D]">
                     No Video Loaded
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                     Add a video above to start watching together.
                  </p>

               </div>

            )}

         </div>


         {/* PLAYLIST */}
         <div>

            <div className="mb-4 flex items-center justify-between">

               <div>

                  <h3 className="text-lg font-bold text-[#163B3D]">
                     📃 Playlist
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                     {playlist.length}{" "}
                     {playlist.length === 1
                        ? "video"
                        : "videos"}{" "}
                     available
                  </p>

               </div>

            </div>


            {playlist.length === 0 ? (

               <div className="rounded-2xl border border-dashed border-[#B9DDDF] bg-[#F4FAFA] p-8 text-center">

                  <div className="mb-3 text-3xl">
                     📺
                  </div>

                  <p className="text-sm font-medium text-[#163B3D]">
                     No videos added yet
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                     Add your first video using the form above.
                  </p>

               </div>

            ) : (

               <div className="space-y-3">

                  {playlist.map(
                     (video, index) => {

                        const videoType =
                           getVideoType(
                              video.videoId
                           );

                        const isPlaying =
                           video.videoId ===
                           videoId;

                        return (

                           <div
                              key={video._id}
                              className={`flex flex-col gap-4 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                                 isPlaying
                                    ? "border-[#16838A] bg-[#E8F5F5]"
                                    : "border-[#D9EEEE] bg-white hover:border-[#16838A] hover:bg-[#F4FAFA]"
                              }`}
                           >

                              {/* VIDEO DETAILS */}
                              <div className="flex min-w-0 items-center gap-3">

                                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5F5] text-lg">
                                    🎬
                                 </div>

                                 <div className="min-w-0">

                                    <div className="flex flex-wrap items-center gap-2">

                                       <p className="truncate font-semibold text-[#163B3D]">
                                          {index + 1}.{" "}
                                          {video.title ||
                                             "Untitled Video"}
                                       </p>

                                       {isPlaying && (

                                          <span className="rounded-full bg-[#16838A] px-2 py-0.5 text-[10px] font-bold text-white">
                                             PLAYING
                                          </span>

                                       )}

                                    </div>

                                    <p className="mt-1 text-xs text-slate-500">
                                       {videoType}
                                    </p>

                                 </div>

                              </div>


                              {/* ACTIONS */}
                              <div className="flex shrink-0 gap-2">

                                 <button
                                    onClick={() =>
                                       playVideo(
                                          video
                                       )
                                    }
                                    disabled={
                                       isPlaying
                                    }
                                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                       isPlaying
                                          ? "cursor-default bg-[#E8F5F5] text-[#16838A]"
                                          : "bg-[#16838A] text-white hover:bg-[#116B70]"
                                    }`}
                                 >
                                    {isPlaying
                                       ? "Playing"
                                       : "▶ Play"}
                                 </button>


                                 <button
                                    onClick={() =>
                                       deleteVideo(
                                          video._id
                                       )
                                    }
                                    className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                    title="Delete video"
                                 >
                                    🗑
                                 </button>

                              </div>

                           </div>

                        );
                     }
                  )}

               </div>

            )}

         </div>

      </div>
   );
}

export default VideoSyncPlayer;