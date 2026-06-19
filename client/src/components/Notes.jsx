

// import { useEffect, useState } from "react";
// import API from "../services/api";


// function Notes({ videoId }) {


// const [notes,setNotes] = useState([]);

// const [content,setContent] = useState("");

// const [pdf,setPdf] = useState(null);

// const [search,setSearch] = useState("");




// const fetchNotes = async()=>{

// try{

// const res = await API.get(
// `/note/${videoId}`
// );

// setNotes(res.data);


// }catch(error){

// console.log(error);

// }

// }





// useEffect(()=>{

// fetchNotes();

// },[videoId]);






// const addNote = async()=>{


// const form = new FormData();


// form.append(
// "videoId",
// videoId
// );


// form.append(
// "content",
// content
// );



// if(pdf){

// form.append(
// "pdf",
// pdf
// );

// }



// await API.post(
// "/note/add",
// form
// );



// setContent("");

// setPdf(null);


// fetchNotes();


// }





// const deleteNote = async(id)=>{


// await API.delete(
// `/note/${id}`
// );


// fetchNotes();


// }





// return (

// <div className="bg-white p-5 mt-5 rounded shadow">


// <h2 className="text-xl font-bold">
// Notes
// </h2>



// {/* Search Notes */}

// <input

// type="text"

// placeholder="Search notes..."

// value={search}

// onChange={
// e=>setSearch(e.target.value)
// }

// className="border p-2 w-full mt-3 rounded"

// />





// <textarea

// value={content}

// onChange={
// e=>setContent(e.target.value)
// }

// placeholder="Write your note..."

// className="border p-2 w-full mt-3"

// />





// <input

// type="file"

// accept="application/pdf"

// onChange={
// e=>setPdf(e.target.files[0])
// }

// className="mt-3"

// />




// <button

// onClick={addNote}

// className="bg-black text-white px-4 py-2 mt-3 rounded"

// >

// Save Note

// </button>





// {
// notes

// .filter(note=>

// note.content
// .toLowerCase()
// .includes(
// search.toLowerCase()
// )

// )

// .map(note=>(


// <div

// key={note._id}

// className="border p-4 mt-4 rounded"

// >



// <p className="font-semibold">

// {note.content}

// </p>




// {/* Uploaded Date */}

// <p className="text-sm text-gray-500 mt-2">

// Uploaded:

// {
// new Date(
// note.createdAt
// )
// .toLocaleDateString()

// }

// </p>





// {/* PDF Preview */}

// {

// note.pdf &&

// <iframe

// src={
// `http://localhost:5000${note.pdf}`
// }

// width="100%"

// height="400"

// className="mt-3 border"

// />

// }







// {/* Download PDF */}

// {

// note.pdf &&

// <a

// href={
// `http://localhost:5000${note.pdf}`
// }

// download

// className="text-blue-600 block mt-3"

// >

// Download PDF

// </a>

// }







// <button

// onClick={()=>deleteNote(note._id)}

// className="bg-red-500 text-white px-3 py-1 mt-3 rounded"

// >

// Delete

// </button>



// </div>


// ))


// }



// </div>


// );


// }


// export default Notes;


import { useEffect, useState } from "react";
import API from "../services/api";


function Notes({ videoId }) {


const [notes,setNotes] = useState([]);

const [content,setContent] = useState("");

const [pdf,setPdf] = useState(null);

const [search,setSearch] = useState("");


// edit states
const [editId,setEditId] = useState(null);

const [editContent,setEditContent] = useState("");





const fetchNotes = async()=>{

try{

const res = await API.get(
`/note/${videoId}`
);

setNotes(res.data);


}catch(error){

console.log(error);

}

}




useEffect(()=>{

fetchNotes();

},[videoId]);







const addNote = async()=>{


const form = new FormData();


form.append(
"videoId",
videoId
);


form.append(
"content",
content
);



if(pdf){

form.append(
"pdf",
pdf
);

}



await API.post(
"/note/add",
form
);



setContent("");

setPdf(null);


fetchNotes();


}






// DELETE

const deleteNote = async(id)=>{


await API.delete(
`/note/${id}`
);


fetchNotes();


}






// EDIT

const editNote = (note)=>{

setEditId(note._id);

setEditContent(note.content);


}




// UPDATE

const updateNote = async()=>{


await API.put(

`/note/${editId}`,

{
content:editContent
}

);


setEditId(null);

setEditContent("");

fetchNotes();


}






return (

<div className="bg-white p-5 mt-5 rounded shadow">


<h2 className="text-xl font-bold">
Notes
</h2>





<input

type="text"

placeholder="Search notes..."

value={search}

onChange={
e=>setSearch(e.target.value)
}

className="border p-2 w-full mt-3 rounded"

/>





<textarea

value={content}

onChange={
e=>setContent(e.target.value)
}

placeholder="Write your note..."

className="border p-2 w-full mt-3"

/>





<input

type="file"

accept="application/pdf"

onChange={
e=>setPdf(e.target.files[0])
}

/>





<button

onClick={addNote}

className="bg-black text-white px-4 py-2 mt-3 rounded"

>

Save Note

</button>







{
notes

.filter(note=>

note.content
.toLowerCase()
.includes(
search.toLowerCase()
)

)

.map(note=>(


<div

key={note._id}

className="border p-4 mt-4 rounded"

>




{
editId === note._id ?


<>

<textarea

value={editContent}

onChange={
e=>setEditContent(e.target.value)
}

className="border w-full p-2"

/>


<button

onClick={updateNote}

className="bg-green-600 text-white px-3 py-1 mt-2 rounded"

>

Update

</button>


</>



:


<>

<p className="font-semibold">

{note.content}

</p>



<p className="text-sm text-gray-500 mt-2">

Uploaded:

{
new Date(note.createdAt)
.toLocaleDateString()
}

</p>





{
note.pdf &&

<iframe

src={
`http://localhost:5000${note.pdf}`
}

width="100%"

height="400"

className="mt-3 border"

/>

}





{
note.pdf &&

<a

href={
`http://localhost:5000${note.pdf}`
}

download

className="text-blue-600 block mt-3"

>

Download PDF

</a>

}





<div className="flex gap-3 mt-3">


<button

onClick={()=>editNote(note)}

className="bg-yellow-500 px-3 py-1 rounded"

>

Edit

</button>





<button

onClick={()=>deleteNote(note._id)}

className="bg-red-500 text-white px-3 py-1 rounded"

>

Delete

</button>


</div>



</>


}



</div>


))


}





</div>

);


}


export default Notes;