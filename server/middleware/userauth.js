const jwt=require('jsonwebtoken');
const key=process.env.secretkey;

const userauth=(req,res,next)=>{
    const token=req.header('token');
 
    
    if (!token) return res.status(401).send({ auth: false, message: 'No Token Provided' })
    try{
        const decoded=jwt.verify(token,key);
        
        req.user=decoded;
      
        
        next();
    }
    catch(err){
        res.status(401).send({error:"Please authenticate."});
    }
}

module.exports=userauth;