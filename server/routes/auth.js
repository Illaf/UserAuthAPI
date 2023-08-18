const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const DB=process.env.DATABASE;
// mongoose.connect(DB).then(()=>{
//     console.log("connection successful");
// }).catch((err)=>console.log(err));
// const DB="mongodb+srv://ilafshafeeq:KO0tktMFmKnE79I2@cluster0.pixhvm3.mongodb.net/?retryWrites=true&w=majority";
(async ()=>{
    try{
      await mongoose.connect(DB,{useNewUrlParser:true})
      console.log("database connected successfully")
    }catch(err){
      console.log('error'+err)
    }
  }
    )()
  
const Logindetail= require("../models/userSchema");


router.get("/",(req,res)=>{
    res.send("hello from server router side")
});

router.get("/register",(req,res)=>{
  res.send("hello from register page");
});

router.post("/register",async (req,res)=>{
    const{name,email,phone,work,password,cpassword}= req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
       return  res.status(422).json({error:"Please fill the fields"});
         
    }
    try{
      const foundUser=await Logindetail.findOne({email:email});
      if(foundUser){
        return res.status(422).json({error:"email already exist"});
    }else if(password != cpassword){
      return res.status(422).json({error:"Password and confirm password does not match"})
    }
    else{
      const logindetail = new Logindetail({name,email,phone,work,password,cpassword});
    
      const userRegister=await logindetail.save();
      if(userRegister){
        res.status(201).json({message:"user registered successfully"});
      }
  
    }
   
    
    }
    catch(err){
      console.log(err);
    }


});

router.post("/signin",async (req,res)=>{
//console.log(req.body);
//res.json({message:"awesome"})
try{
const {email,password}=req.body;
//console.log(req.body);
if(!email || !password){
  return res.status(400).json({error:"enter both the fields"});
}
const userLogin=await Logindetail.findOne({email:email});//.findOne gives the whole document with the matching query
console.log(userLogin);
const token = await userLogin.generateAuthToken();
console.log(token);
res.cookie("jwtToken",token,{
  expires:new Date(Date.now()+25892000000),
  httpOnly:true
});
if(password != userLogin.password || email!=userLogin.email){
  res.status(400).json({error:"Invalid credentials"});
}
 else{
  res.json({message:"user signin successfull"})
}

}catch(err){
console.log("what?"+err);
}
});
module.exports= router;