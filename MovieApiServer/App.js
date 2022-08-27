const mongoose = require('mongoose')
const express=require('express');
const app=express();
const dotenv = require("dotenv")

dotenv.config({path:'./config.env'})

const PORT = process.env.PORT;
const db = process.env.db
const conn=async(req,res,next) =>{
    try{
        
        await mongoose.connect(
            `${db}`
            )
            
            .then(()=>{
                console.log("connected");
            });
        }
        catch(error){
            res.status(400).json({message:"not connected"});
            console.log(error);
        }
    };
    
    conn();
    
app.use(express.json())

const User = require("./models/userSchema");
    
//     const middleware=(req,res,next)=>{
//     console.log('Hello my Middleware');
//     next();
// }


// app.get('/',(req,res)=>{
//     res.send('hello yarr');
// });

           //** post api for add movie  *//
app.post('/add-movie',async (req,res)=>{
    const{id,name,date,price}= req.body;

    // res.json({message:req.body});

    try{
        const userExist=await User.findOne({id:id});
        if(userExist){
            return res.status(422).json({error:"Movie already Exist"});
       }
        const user = new User({id,name,date,price});
        await user.save();
        res.status(201).json({message:"movie registered successfuly"});
    }catch(err){
        console.log(err);
    }
})
                //**helps to get single movie provide by id by user *//
app.get('/get-single',(req,res,next)=>{

//   req.params.id = parseInt(req.query.id);
//   console.log(req.query.name);
   User.find({id:req.query.id})
   .then(result=>{
     res.status(200).json({
       MovieData:result

     });
   })
   .catch(err=>{
     console.log(err);
     res.status(500).json({
       error:err
     })
   });
})
                        //**Helps to get all movie**//

app.get('/get-all',(req,res,next)=>{
   User.find()
   .then(result=>{
     res.status(200).json({
       MovieData:result

     });
   })
   .catch(err=>{
     console.log(err);
     res.status(500).json({
       error:err
     })
   });
})


                              //**Pagination for movie**//

app.get('/get-paginated',async(req,res,next)=>{
  const { page = 1, limit = 10 } = req.query;
  try {
    const Users = await User.find().limit(limit *1).skip(( (page-1)*limit));
    res.status(200).json({total: Users.length, Users });
  } catch (err){
   console.log(err);
    res.status (500).json({error: err});
}
});





app.listen(PORT,()=>{
    console.log(`server is runnig at port no ${PORT}`);
})


