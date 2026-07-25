

// // // import { useEffect, useState } from "react";
// // // import API from "../services/api";


// // // function Notes({ videoId }) {


// // // const [notes,setNotes] = useState([]);

// // // const [content,setContent] = useState("");

// // // const [pdf,setPdf] = useState(null);

// // // const [search,setSearch] = useState("");




// // // const fetchNotes = async()=>{

// // // try{

// // // const res = await API.get(
// // // `/note/${videoId}`
// // // );

// // // setNotes(res.data);


// // // }catch(error){

// // // console.log(error);

// // // }

// // // }





// // // useEffect(()=>{

// // // fetchNotes();

// // // },[videoId]);






// // // const addNote = async()=>{


// // // const form = new FormData();


// // // form.append(
// // // "videoId",
// // // videoId
// // // );


// // // form.append(
// // // "content",
// // // content
// // // );



// // // if(pdf){

// // // form.append(
// // // "pdf",
// // // pdf
// // // );

// // // }



// // // await API.post(
// // // "/note/add",
// // // form
// // // );



// // // setContent("");

// // // setPdf(null);


// // // fetchNotes();


// // // }





// // // const deleteNote = async(id)=>{


// // // await API.delete(
// // // `/note/${id}`
// // // );


// // // fetchNotes();


// // // }





// // // return (

// // // <div className="bg-white p-5 mt-5 rounded shadow">


// // // <h2 className="text-xl font-bold">
// // // Notes
// // // </h2>



// // // {/* Search Notes */}

// // // <input

// // // type="text"

// // // placeholder="Search notes..."

// // // value={search}

// // // onChange={
// // // e=>setSearch(e.target.value)
// // // }

// // // className="border p-2 w-full mt-3 rounded"

// // // />





// // // <textarea

// // // value={content}

// // // onChange={
// // // e=>setContent(e.target.value)
// // // }

// // // placeholder="Write your note..."

// // // className="border p-2 w-full mt-3"

// // // />





// // // <input

// // // type="file"

// // // accept="application/pdf"

// // // onChange={
// // // e=>setPdf(e.target.files[0])
// // // }

// // // className="mt-3"

// // // />




// // // <button

// // // onClick={addNote}

// // // className="bg-black text-white px-4 py-2 mt-3 rounded"

// // // >

// // // Save Note

// // // </button>





// // // {
// // // notes

// // // .filter(note=>

// // // note.content
// // // .toLowerCase()
// // // .includes(
// // // search.toLowerCase()
// // // )

// // // )

// // // .map(note=>(


// // // <div

// // // key={note._id}

// // // className="border p-4 mt-4 rounded"

// // // >



// // // <p className="font-semibold">

// // // {note.content}

// // // </p>




// // // {/* Uploaded Date */}

// // // <p className="text-sm text-gray-500 mt-2">

// // // Uploaded:

// // // {
// // // new Date(
// // // note.createdAt
// // // )
// // // .toLocaleDateString()

// // // }

// // // </p>





// // // {/* PDF Preview */}

// // // {

// // // note.pdf &&

// // // <iframe

// // // src={
// // // `http://localhost:5000${note.pdf}`
// // // }

// // // width="100%"

// // // height="400"

// // // className="mt-3 border"

// // // />

// // // }







// // // {/* Download PDF */}

// // // {

// // // note.pdf &&

// // // <a

// // // href={
// // // `http://localhost:5000${note.pdf}`
// // // }

// // // download

// // // className="text-blue-600 block mt-3"

// // // >

// // // Download PDF

// // // </a>

// // // }







// // // <button

// // // onClick={()=>deleteNote(note._id)}

// // // className="bg-red-500 text-white px-3 py-1 mt-3 rounded"

// // // >

// // // Delete

// // // </button>



// // // </div>


// // // ))


// // // }



// // // </div>


// // // );


// // // }


// // // export default Notes;


// // import { useEffect, useState } from "react";
// // import API from "../services/api";


// // function Notes({ videoId }) {


// // const [notes,setNotes] = useState([]);

// // const [content,setContent] = useState("");

// // const [pdf,setPdf] = useState(null);

// // const [search,setSearch] = useState("");


// // // edit states
// // const [editId,setEditId] = useState(null);

// // const [editContent,setEditContent] = useState("");





// // const fetchNotes = async()=>{

// // try{

// // const res = await API.get(
// // `/note/${videoId}`
// // );

// // setNotes(res.data);


// // }catch(error){

// // console.log(error);

// // }

// // }




// // useEffect(()=>{

// // fetchNotes();

// // },[videoId]);







// // const addNote = async()=>{


// // const form = new FormData();


// // form.append(
// // "videoId",
// // videoId
// // );


// // form.append(
// // "content",
// // content
// // );



// // if(pdf){

// // form.append(
// // "pdf",
// // pdf
// // );

// // }



// // await API.post(
// // "/note/add",
// // form
// // );



// // setContent("");

// // setPdf(null);


// // fetchNotes();


// // }






// // // DELETE

// // const deleteNote = async(id)=>{


// // await API.delete(
// // `/note/${id}`
// // );


// // fetchNotes();


// // }






// // // EDIT

// // const editNote = (note)=>{

// // setEditId(note._id);

// // setEditContent(note.content);


// // }




// // // UPDATE

// // const updateNote = async()=>{


// // await API.put(

// // `/note/${editId}`,

// // {
// // content:editContent
// // }

// // );


// // setEditId(null);

// // setEditContent("");

// // fetchNotes();


// // }






// // return (

// // <div className="bg-white p-5 mt-5 rounded shadow">


// // <h2 className="text-xl font-bold">
// // Notes
// // </h2>





// // <input

// // type="text"

// // placeholder="Search notes..."

// // value={search}

// // onChange={
// // e=>setSearch(e.target.value)
// // }

// // className="border p-2 w-full mt-3 rounded"

// // />





// // <textarea

// // value={content}

// // onChange={
// // e=>setContent(e.target.value)
// // }

// // placeholder="Write your note..."

// // className="border p-2 w-full mt-3"

// // />





// // <input

// // type="file"

// // accept="application/pdf"

// // onChange={
// // e=>setPdf(e.target.files[0])
// // }

// // />





// // <button

// // onClick={addNote}

// // className="bg-black text-white px-4 py-2 mt-3 rounded"

// // >

// // Save Note

// // </button>







// // {
// // notes

// // .filter(note=>

// // note.content
// // .toLowerCase()
// // .includes(
// // search.toLowerCase()
// // )

// // )

// // .map(note=>(


// // <div

// // key={note._id}

// // className="border p-4 mt-4 rounded"

// // >




// // {
// // editId === note._id ?


// // <>

// // <textarea

// // value={editContent}

// // onChange={
// // e=>setEditContent(e.target.value)
// // }

// // className="border w-full p-2"

// // />


// // <button

// // onClick={updateNote}

// // className="bg-green-600 text-white px-3 py-1 mt-2 rounded"

// // >

// // Update

// // </button>


// // </>



// // :


// // <>

// // <p className="font-semibold">

// // {note.content}

// // </p>



// // <p className="text-sm text-gray-500 mt-2">

// // Uploaded:

// // {
// // new Date(note.createdAt)
// // .toLocaleDateString()
// // }

// // </p>





// // {
// // note.pdf &&

// // <iframe

// // src={
// // `http://localhost:5000${note.pdf}`
// // }

// // width="100%"

// // height="400"

// // className="mt-3 border"

// // />

// // }





// // {
// // note.pdf &&

// // <a

// // href={
// // `http://localhost:5000${note.pdf}`
// // }

// // download

// // className="text-blue-600 block mt-3"

// // >

// // Download PDF

// // </a>

// // }





// // <div className="flex gap-3 mt-3">


// // <button

// // onClick={()=>editNote(note)}

// // className="bg-yellow-500 px-3 py-1 rounded"

// // >

// // Edit

// // </button>





// // <button

// // onClick={()=>deleteNote(note._id)}

// // className="bg-red-500 text-white px-3 py-1 rounded"

// // >

// // Delete

// // </button>


// // </div>



// // </>


// // }



// // </div>


// // ))


// // }





// // </div>

// // );


// // }


// // export default Notes;

// import { useEffect, useState } from "react";
// import API from "../services/api";

// function Notes({ videoId }) {

//    const [notes, setNotes] = useState([]);

//    const [content, setContent] = useState("");

//    const [pdf, setPdf] = useState(null);

//    const [search, setSearch] = useState("");

//    // edit states
//    const [editId, setEditId] = useState(null);

//    const [editContent, setEditContent] = useState("");

//    const fetchNotes = async () => {

//       try {

//          const res = await API.get(
//             `/note/${videoId}`
//          );

//          setNotes(res.data);

//       } catch (error) {

//          console.log(error);

//       }

//    };

//    useEffect(() => {

//       fetchNotes();

//    }, [videoId]);

//    const addNote = async () => {

//       const form = new FormData();

//       form.append(
//          "videoId",
//          videoId
//       );

//       form.append(
//          "content",
//          content
//       );

//       if (pdf) {

//          form.append(
//             "pdf",
//             pdf
//          );

//       }

//       await API.post(
//          "/note/add",
//          form
//       );

//       setContent("");

//       setPdf(null);

//       fetchNotes();

//    };

//    // DELETE

//    const deleteNote = async (id) => {

//       await API.delete(
//          `/note/${id}`
//       );

//       fetchNotes();

//    };

//    // EDIT

//    const editNote = (note) => {

//       setEditId(note._id);

//       setEditContent(note.content);

//    };

//    // UPDATE

//    const updateNote = async () => {

//       await API.put(

//          `/note/${editId}`,

//          {
//             content: editContent
//          }

//       );

//       setEditId(null);

//       setEditContent("");

//       fetchNotes();

//    };

//    return (

//       <div className="card bg-base-100 shadow-xl p-4 sm:p-5 mt-5">

//          <div className="flex items-center justify-between mb-5">

//             <h2 className="text-2xl font-bold text-base-content">

//                📝 Notes

//             </h2>

//             <div className="badge badge-primary">

//                {notes.length} Notes

//             </div>

//          </div>

//          {/* Search Notes */}

//          <input

//             type="text"

//             placeholder="Search notes..."

//             value={search}

//             onChange={
//                e => setSearch(e.target.value)
//             }

//             className="input input-bordered w-full"

//          />

//          {/* Add Note */}

//          <div className="mt-4">

//             <textarea

//                value={content}

//                onChange={
//                   e => setContent(e.target.value)
//                }

//                placeholder="Write your note..."

//                className="textarea textarea-bordered w-full h-32 resize-none"

//             />

//             <div className="flex flex-col sm:flex-row gap-3 mt-3">

//                <input

//                   type="file"

//                   accept="application/pdf"

//                   onChange={
//                      e => setPdf(e.target.files[0])
//                   }

//                   className="file-input file-input-bordered w-full sm:flex-1"

//                />

//                <button

//                   onClick={addNote}

//                   className="btn btn-primary"

//                >

//                   Save Note

//                </button>

//             </div>

//          </div>

//          <div className="divider"></div>

//          {/* Notes List */}

//          <div className="space-y-4">

//             {

//                notes

//                   .filter(note =>

//                      note.content

//                         .toLowerCase()

//                         .includes(

//                            search.toLowerCase()

//                         )

//                   )

//                   .map(note => (

//                      <div

//                         key={note._id}

//                         className="border border-base-300 rounded-box p-4 bg-base-100 shadow-sm"

//                      >

//                         {

//                            editId === note._id ?

//                               (

//                                  <>

//                                     <textarea

//                                        value={editContent}

//                                        onChange={
//                                           e => setEditContent(e.target.value)
//                                        }

//                                        className="textarea textarea-bordered w-full"

//                                     />

//                                     <button

//                                        onClick={updateNote}

//                                        className="btn btn-success btn-sm text-white mt-3"

//                                     >

//                                        Update

//                                     </button>

//                                  </>

//                               )

//                               :

//                               (

//                                  <>

//                                     <p className="font-semibold text-base-content break-words">

//                                        {note.content}

//                                     </p>

//                                     <p className="text-sm text-base-content/60 mt-2">

//                                        Uploaded:{" "}

//                                        {

//                                           new Date(note.createdAt)

//                                              .toLocaleDateString()

//                                        }

//                                     </p>

//                                     {

//                                        note.pdf &&

//                                        <iframe

//                                           src={
//                                              `http://localhost:5000${note.pdf}`
//                                           }

//                                           width="100%"

//                                           height="400"

//                                           className="mt-3 border border-base-300 rounded-box"

//                                        />

//                                     }

//                                     {

//                                        note.pdf &&

//                                        <a

//                                           href={
//                                              `http://localhost:5000${note.pdf}`
//                                           }

//                                           download

//                                           className="link link-primary block mt-3"

//                                        >

//                                           Download PDF

//                                        </a>

//                                     }

//                                     <div className="flex flex-wrap gap-3 mt-4">

//                                        <button

//                                           onClick={() => editNote(note)}

//                                           className="btn btn-warning btn-sm"

//                                        >

//                                           Edit

//                                        </button>

//                                        <button

//                                           onClick={() => deleteNote(note._id)}

//                                           className="btn btn-error btn-sm text-white"

//                                        >

//                                           Delete

//                                        </button>

//                                     </div>

//                                  </>

//                               )

//                         }

//                      </div>

//                   ))

//             }

//          </div>

//       </div>

//    );

// }

// export default Notes;


import { useEffect, useRef, useState } from "react";
import API from "../services/api";

function Notes({ videoId }) {
   const [notes, setNotes] = useState([]);
   const [content, setContent] = useState("");
   const [pdf, setPdf] = useState(null);
   const [search, setSearch] = useState("");

   const [editId, setEditId] = useState(null);
   const [editContent, setEditContent] = useState("");

   const fileInputRef = useRef(null);

   // ===============================
   // FETCH NOTES
   // ===============================

   const fetchNotes = async () => {
      if (!videoId) {
         console.log("Video ID is missing");
         return;
      }

      try {
         const response = await API.get(
            `/note/${videoId}`
         );

         setNotes(response.data);

      } catch (error) {
         console.error(
            "FETCH NOTES ERROR:",
            error.response?.data || error.message
         );
      }
   };

   useEffect(() => {
      fetchNotes();
   }, [videoId]);

   // ===============================
   // ADD NOTE
   // ===============================

   const addNote = async () => {
      try {
         if (!videoId) {
            alert("Video ID is missing");
            return;
         }

         if (!content.trim()) {
            alert("Please write something in the note");
            return;
         }

         const formData = new FormData();

         formData.append(
            "videoId",
            videoId
         );

         formData.append(
            "content",
            content.trim()
         );

         if (pdf) {
            formData.append(
               "pdf",
               pdf
            );
         }

         const response = await API.post(
            "/note/add",
            formData
         );

         console.log(
            "NOTE SAVED:",
            response.data
         );

         setContent("");
         setPdf(null);

         if (fileInputRef.current) {
            fileInputRef.current.value = "";
         }

         await fetchNotes();

         alert("Note saved successfully");

      } catch (error) {
         console.error(
            "SAVE NOTE ERROR:",
            error.response?.data || error.message
         );

         alert(
            error.response?.data?.message ||
            "Failed to save note"
         );
      }
   };

   // ===============================
   // DELETE NOTE
   // ===============================

   const deleteNote = async (id) => {
      try {
         await API.delete(
            `/note/${id}`
         );

         await fetchNotes();

      } catch (error) {
         console.error(
            "DELETE NOTE ERROR:",
            error.response?.data || error.message
         );
      }
   };

   // ===============================
   // EDIT NOTE
   // ===============================

   const editNote = (note) => {
      setEditId(note._id);
      setEditContent(note.content);
   };

   // ===============================
   // UPDATE NOTE
   // ===============================

   const updateNote = async () => {
      try {
         if (!editContent.trim()) {
            alert("Note cannot be empty");
            return;
         }

         await API.put(
            `/note/${editId}`,
            {
               content: editContent.trim(),
            }
         );

         setEditId(null);
         setEditContent("");

         await fetchNotes();

      } catch (error) {
         console.error(
            "UPDATE NOTE ERROR:",
            error.response?.data || error.message
         );
      }
   };

   const filteredNotes = notes.filter((note) =>
      note.content
         ?.toLowerCase()
         .includes(
            search.toLowerCase()
         )
   );

   return (
      <div className="card mt-5 bg-base-100 p-4 shadow-xl sm:p-5">

         {/* HEADER */}

         <div className="mb-5 flex items-center justify-between">

            <h2 className="text-2xl font-bold text-base-content">
               📝 Notes
            </h2>

            <div className="badge badge-primary">
               {notes.length} Notes
            </div>

         </div>

         {/* SEARCH */}

         <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(event) =>
               setSearch(event.target.value)
            }
            className="input input-bordered w-full"
         />

         {/* ADD NOTE */}

         <div className="mt-4">

            <textarea
               value={content}
               onChange={(event) =>
                  setContent(event.target.value)
               }
               placeholder="Write your note..."
               className="textarea textarea-bordered h-32 w-full resize-none"
            />

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">

               <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={(event) =>
                     setPdf(event.target.files[0])
                  }
                  className="file-input file-input-bordered w-full sm:flex-1"
               />

               <button
                  type="button"
                  onClick={addNote}
                  className="btn btn-primary"
               >
                  Save Note
               </button>

            </div>

         </div>

         <div className="divider" />

         {/* NOTES */}

         <div className="space-y-4">

            {filteredNotes.length === 0 ? (

               <p className="py-6 text-center text-base-content/60">
                  No notes found
               </p>

            ) : (

               filteredNotes.map((note) => (

                  <div
                     key={note._id}
                     className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm"
                  >

                     {editId === note._id ? (

                        <div>

                           <textarea
                              value={editContent}
                              onChange={(event) =>
                                 setEditContent(
                                    event.target.value
                                 )
                              }
                              className="textarea textarea-bordered w-full"
                           />

                           <div className="mt-3 flex gap-2">

                              <button
                                 type="button"
                                 onClick={updateNote}
                                 className="btn btn-success btn-sm text-white"
                              >
                                 Update
                              </button>

                              <button
                                 type="button"
                                 onClick={() => {
                                    setEditId(null);
                                    setEditContent("");
                                 }}
                                 className="btn btn-ghost btn-sm"
                              >
                                 Cancel
                              </button>

                           </div>

                        </div>

                     ) : (

                        <>

                           <p className="break-words font-semibold text-base-content">
                              {note.content}
                           </p>

                           <p className="mt-2 text-sm text-base-content/60">
                              Uploaded:{" "}
                              {new Date(
                                 note.createdAt
                              ).toLocaleDateString()}
                           </p>

                           {note.pdf && (

                              <iframe
                                 src={`http://localhost:5000${note.pdf}`}
                                 title="PDF Preview"
                                 className="mt-3 h-[400px] w-full rounded-box border border-base-300"
                              />

                           )}

                           {note.pdf && (

                              <a
                                 href={`http://localhost:5000${note.pdf}`}
                                 download
                                 target="_blank"
                                 rel="noreferrer"
                                 className="link link-primary mt-3 block"
                              >
                                 Download PDF
                              </a>

                           )}

                           <div className="mt-4 flex flex-wrap gap-3">

                              <button
                                 type="button"
                                 onClick={() =>
                                    editNote(note)
                                 }
                                 className="btn btn-warning btn-sm"
                              >
                                 Edit
                              </button>

                              <button
                                 type="button"
                                 onClick={() =>
                                    deleteNote(note._id)
                                 }
                                 className="btn btn-error btn-sm text-white"
                              >
                                 Delete
                              </button>

                           </div>

                        </>

                     )}

                  </div>

               ))

            )}

         </div>

      </div>
   );
}

export default Notes;