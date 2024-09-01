const express=require('express');
const router=express.Router();
const Note=require('../model/notes');
const userauth = require('../middleware/userauth');

router.get('/getnotes',userauth,async(req,res)=>{
    try {
        const notes=await Note.find({user:req.user._id})
        res.json({notes:notes});

        
    } catch (error) {
         res.status(500).json({message:error.message});
        
    }
})


router.post('/create',userauth,async(req,res)=>{
    try {
        const {title,description}=req.body;
        const createnote=await Note.create({
            title:title,
            description:description,
            user:req.user._id,
            date:Date.now()
        })
        console.log(createnote)
        res.status(201).json({note: createnote})
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
})

router.get('/singlenote/:id',userauth,async(req,res)=>{
    try {
        const id=req.params.id;
        const note=await Note.findById(id);
        if(!note){
            return res.status(404).json({message:"Note not found"})
            }
            res.json({note:note});
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
})

router.post('/update/:id',userauth,async(req,res)=>{
    try {
        const {title,description}=req.body;
        const id=req.params.id;
        const note=await Note.findById(id);
        if(!note){
            return res.status(404).json({message:"Note not found"})
            }
            note.title=title;
            note.description=description;
            await note.save();

            res.send(note)

    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
})

router.delete('/delete/:id',userauth,async(req,res)=>{
    try {
        const id=req.params.id;
        console.log(id);
        
        const note=await Note.findById(id);
        console.log(note);
        
        if(!note){
           return res.status(400).json({message:"Note not exist"});
        }
        await Note.findByIdAndDelete(id);
        res.json({message:"Note deleted successfully"})
        
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
})
module.exports=router;