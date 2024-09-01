const mongoose=require('mongoose');
const {Schema}=mongoose;

const notesSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    title:String,
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
        
    }
})

const Note=mongoose.model('Note',notesSchema);

module.exports=Note;