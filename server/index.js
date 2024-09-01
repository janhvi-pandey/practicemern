const express=require('express');
const cors=require('cors');
const connectmongo=require('./database/db');
const dotenv=require('dotenv');
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
connectmongo();
const port=4000;

app.use('/auth',require('./route/auth'));
app.use('/note',require('./route/note'));

app.get('/',(req,res)=>{
    res.send('Server running');
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})

