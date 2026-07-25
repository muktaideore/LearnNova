

// import { useEffect, useState } from "react";
// import API from "../services/api";

// function Bookmarks() {
//    const [bookmarks, setBookmarks] = useState([]);

//    useEffect(() => {
//       fetchBookmarks();
//    }, []);

//    const fetchBookmarks = async () => {
//       try {
//          const res = await API.get("/bookmark");
//          setBookmarks(res.data);
//       } catch (error) {
//          console.log(error);
//       }
//    };

//    return (
//       <div className="p-8">
//          <h1 className="text-3xl font-bold mb-6">
//             My Bookmarks
//          </h1>

//          {bookmarks.map((bookmark) => (
//             <div
//                key={bookmark._id}
//                className="border p-4 mb-4 rounded shadow"
//             >
//                <h2 className="text-xl font-bold mb-2">
//                   {bookmark.videoId.title}
//                </h2>

//                <iframe
//                   width="100%"
//                   height="300"
//                   src={`https://www.youtube.com/embed/${
//                      bookmark.videoId.videoUrl
//                         .split("v=")[1]
//                         ?.split("&")[0]
//                   }`}
//                   title={bookmark.videoId.title}
//                   allowFullScreen
//                ></iframe>
//             </div>
//          ))}
//       </div>
//    );
// }

// export default Bookmarks;

import { useEffect, useState } from "react";
import API from "../services/api";

function Bookmarks() {
   const [bookmarks, setBookmarks] = useState([]);

   useEffect(() => {
      fetchBookmarks();
   }, []);

   const fetchBookmarks = async () => {
      try {
         const res = await API.get("/bookmark");
         setBookmarks(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   const getYoutubeId = (url) => {
      if (!url) return null;

      return (
         url.split("v=")[1]?.split("&")[0] ||
         url.split("youtu.be/")[1]?.split("?")[0]
      );
   };

   return (
      <div className="min-h-screen bg-base-200 p-4 sm:p-6 md:p-8">

         {/* Header */}
         <div className="mb-8">

            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
               🔖 My Bookmarks
            </h1>

            <p className="text-base-content/60 mt-2">
               Continue learning from your saved videos.
            </p>

         </div>

         {/* Empty State */}
         {bookmarks.length === 0 && (

            <div className="hero min-h-[300px] bg-base-100 rounded-2xl shadow">

               <div className="hero-content text-center">

                  <div>

                     <div className="text-6xl mb-4">
                        🔖
                     </div>

                     <h2 className="text-2xl font-bold">
                        No Bookmarks Yet
                     </h2>

                     <p className="text-base-content/60 mt-2">
                        Save videos to access them quickly later.
                     </p>

                  </div>

               </div>

            </div>

         )}

         {/* Bookmark Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {bookmarks.map((bookmark) => {

               const video = bookmark.videoId;

               const youtubeId = getYoutubeId(
                  video?.videoUrl
               );

               return (

                  <div
                     key={bookmark._id}
                     className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                  >

                     {/* Video */}
                     {youtubeId ? (

                        <figure className="aspect-video">

                           <iframe
                              className="w-full h-full"
                              src={`https://www.youtube.com/embed/${youtubeId}`}
                              title={video?.title}
                              allowFullScreen
                           ></iframe>

                        </figure>

                     ) : (

                        <div className="flex items-center justify-center h-48 bg-base-300">

                           <span className="text-base-content/60">
                              Video unavailable
                           </span>

                        </div>

                     )}

                     {/* Content */}
                     <div className="card-body">

                        <div className="flex justify-between items-start gap-3">

                           <h2 className="card-title text-lg">
                              {video?.title}
                           </h2>

                           <div className="badge badge-primary">
                              Saved
                           </div>

                        </div>

                        <p className="text-sm text-base-content/60">
                           Continue watching this bookmarked video.
                        </p>

                        <div className="card-actions justify-end mt-3">

                           <button className="btn btn-primary btn-sm">
                              ▶ Watch
                           </button>

                           <button className="btn btn-error btn-outline btn-sm">
                              🗑 Remove
                           </button>

                        </div>

                     </div>

                  </div>

               );

            })}

         </div>

      </div>
   );
}

export default Bookmarks;