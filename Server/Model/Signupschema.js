const mongoose=require("mongoose");


const signupform = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});


const Signup = mongoose.model("Signup",signupform);

module.exports=Signup;