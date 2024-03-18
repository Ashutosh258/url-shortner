const mongoose= require('mongoose')
const userSchema =new mongoose.Schema({
    name:{
        required:true,
        type:String,
        
    },
    email:{
        required:true,
        type:String,
        unqiue:true,
    },
    password:{
        required:true,
        type:String,
    }
},{timestamps:true});

const URL=mongoose.model("user",userSchema);
module.exports=URL;