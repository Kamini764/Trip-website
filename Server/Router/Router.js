const express = require ("express");
const router = express.Router();
const Signup = require("../Model/Signupschema");
const login=require("../Model/Loginschema");
const Contact = require("../Model/Contactschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
 
  
  try {
     const UserExist=Signup.findOne({email});
     if(UserExist){
      console.log("User already Exist");
     }
     const hashedPassword = await bcrypt.hash(password, 10);
     const newSignup = new Signup({ name, email, password:hashedPassword });
     await newSignup.save();
      res.status(200).json({
      success: true,
      message: "Register success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


router.post("/contact",async(req,res)=>{
    const {name,email,subject,message}=req.body;
    try {
        const newcontact = new Contact ({name,email,subject,message});
        await newcontact.save();
        res.status(200).json({
            success:true,
            message:"contacted successfully"
        })
    } catch (error) {
        res.status(400).json({
            message:"error"
        });
    }
})

const JWT_SECRET = "your_jwt_secret_key";
router.post("/login",async(req,res)=>{
 const {email,password}=req.body;

    try {
       const user = await Signup.findOne({email});
        if(!user){
          res.status(400).send("user does not exists") ;
        }
        else{
          const isMatch = await bcrypt.compare(password, user.password); 

          if (!isMatch) {
              return res.status(400).json({ message: " invalid password" });
          }
           const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload (data you want to encode in the token)
            JWT_SECRET, // Secret key to sign the token
            { expiresIn: '1h' } // Token expiry time (optional)
            );
            res.status(200).json({ message: "Login successful" });
          
        }
        
       
    } catch (error) {
        res.status(404).json({
            message:"something went wrong"
        })
    }
})

module.exports = router;
