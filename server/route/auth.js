const express=require('express');
const router=express.Router();
const User=require('../model/user');
const jwt=require('jsonwebtoken');
const userauth = require('../middleware/userauth');
const key=process.env.secretkey;


router.post('/register',async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        const userexist= await User.findOne({email:email});
        if(userexist){
            return res.status(400).json({alreadyexist:true,msg:"User exist"});
        }
        const usercreate=await User.create({
            name:name,
            email:email,
            password:password,
        })
        const token=jwt.sign({id:usercreate._id},key);
        return res.status(201).json({alreadyexist:false,token:token,user:usercreate,msg:"Success"})
    } catch (error) {
     return res.status(500).json({mesaage:error.mesaage});
    }
})


router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userexist= await User.findOne({email:email});
        console.log(userexist);
        if(userexist){
            if(password===userexist.password){
                const token=jwt.sign({id:userexist._id},key);
                console.log(userexist.password);
                return res.status(200).json({alreadyexist:true,token:token,user:userexist});
            }
            else{
                return res.status(400).json({alreadyexist:false,token:null,user:null});
            }
        }
        return res.status(400).json({alreadyexist:false,message:"user does not exist"});
    } catch (error) {
       return res.status(500).json({message:error.message}); 
    }
})


router.get('/userprofile',userauth, async(req,res)=>{
    try {
        console.log(req.user.id);
        
        const userdata = await User.findById(req.user.id);
        console.log(userdata);
        
        if (userdata) {
          return res.json(userdata);
        }
            return res.status(400).json({message:"user does not exist"});
        
    } catch (error) {
        return res.status(500).json({message:error.message});
        
    }
})

module.exports=router;