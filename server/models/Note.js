import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({

 videoId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video",
    required:true
 },


 content:{
    type:String,
 },


 pdf:{
    type:String,
    default:""
 },


},
{
 timestamps:true
});


export default mongoose.model("Note",noteSchema);