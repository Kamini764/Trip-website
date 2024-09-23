const mongoose=require("mongoose");


const loginform = mongoose.Schema({
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


const Login = mongoose.model("Login",loginform);

module.exports=Login;