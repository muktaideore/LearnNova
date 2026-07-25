// import { useEffect, useState } from "react";
// import API from "../../services/api";

// function SharedNotes({ room }) {
//    const [notes, setNotes] = useState("");
//    const [saving, setSaving] = useState(false);

//    useEffect(() => {
//       if (room) {
//          fetchNotes();
//       }
//    }, [room]);

//    const fetchNotes = async () => {
//       try {
//          const res = await API.get(`/notes/${room._id}`);

//          if (res.data) {
//             setNotes(res.data.notes || "");
//          }
//       } catch (err) {
//          console.log(err);
//       }
//    };

//    const saveNotes = async () => {
//       try {
//          setSaving(true);

//          await API.post("/notes", {
//             roomId: room._id,
//             notes,
//          });

//          setSaving(false);
//       } catch (err) {
//          console.log(err);
//          setSaving(false);
//       }
//    };

//    return (
//       <div className="bg-white rounded-2xl shadow-lg p-6">

//          <div className="flex justify-between items-center mb-5">

//             <h2 className="text-2xl font-bold">
//                📝 Shared Notes
//             </h2>

//             <button
//                onClick={saveNotes}
//                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
//             >
//                {saving ? "Saving..." : "Save Notes"}
//             </button>

//          </div>

//          <textarea
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             placeholder="Write notes together..."
//             className="w-full h-[350px] border rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-blue-500"
//          />

//       </div>
//    );
// }

// export default SharedNotes;

import { useEffect, useState } from "react";
import API from "../../services/api";

function SharedNotes({ room }) {
   const [notes, setNotes] = useState("");
   const [saving, setSaving] = useState(false);

   useEffect(() => {
      if (room) {
         fetchNotes();
      }
   }, [room]);

   const fetchNotes = async () => {
      try {
         const res = await API.get(
            `/room-notes/${room._id}`
         );

         setNotes(res.data.notes || "");
      } catch (err) {
         console.log(err);
      }
   };

   const saveNotes = async () => {
      try {
         setSaving(true);

         await API.post("/room-notes", {
            roomId: room._id,
            notes,
         });

         setSaving(false);
      } catch (err) {
         console.log(err);
         setSaving(false);
      }
   };

   return (
      <div className="bg-white p-5 sm:p-6">

         {/* HEADER */}
         <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-xl">
                  📝
               </div>

               <div>
                  <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                     Shared Notes
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                     Collaborate and save important study points
                  </p>
               </div>

            </div>

            <button
               onClick={saveNotes}
               disabled={saving}
               className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >

               {saving ? (
                  <>
                     <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                     Saving...
                  </>
               ) : (
                  <>
                     💾 Save Notes
                  </>
               )}

            </button>

         </div>

         {/* NOTES EDITOR */}
         <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">

            <textarea
               value={notes}
               onChange={(e) =>
                  setNotes(e.target.value)
               }
               placeholder="Write your shared notes here..."
               className="h-[350px] w-full resize-none rounded-xl border border-transparent bg-white p-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 sm:text-base"
            />

         </div>

         {/* FOOTER */}
         <div className="mt-3 flex items-center justify-between text-xs text-slate-400">

            <span>
               ✍️ Write and organize your study notes
            </span>

            <span>
               {notes.length} characters
            </span>

         </div>

      </div>
   );
}

export default SharedNotes;