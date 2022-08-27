const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{

        type:String,
        required:true
   },
    date:{
   
         type:String,
        required:true
    },
    price:{
         type:Number,
        required:true
    }

})

const User = mongoose.model('USER',userSchema);

module.exports= User;