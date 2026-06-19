import express from "express";
import multer from "multer";
import Note from "../models/Note.js";


const router = express.Router();



const storage = multer.diskStorage({

 destination:"uploads/",


 filename:(req,file,cb)=>{

 cb(null,Date.now()+"-"+file.originalname);

 }

});


const upload = multer({storage});



// ADD NOTE

router.post(
"/add",
upload.single("pdf"),
async(req,res)=>{


try{


const note = await Note.create({

videoId:req.body.videoId,

content:req.body.content,

pdf:req.file
? `/uploads/${req.file.filename}`
: ""

});


res.json(note);



}catch(error){

res.status(500).json({
message:error.message
});

}


});





// GET NOTES


router.get("/:videoId",async(req,res)=>{


const notes = await Note.find({

videoId:req.params.videoId

});


res.json(notes);


});






// EDIT NOTE


router.put("/:id",async(req,res)=>{


const note = await Note.findByIdAndUpdate(

req.params.id,

{
content:req.body.content
},

{
new:true
}

);


res.json(note);


});





// DELETE NOTE


router.delete("/:id",async(req,res)=>{


await Note.findByIdAndDelete(
req.params.id
);


res.json({
message:"Deleted"
});


});




export default router;