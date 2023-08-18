const dotenv=require('dotenv');
const mongoose=require('mongoose');
const express=require('express');
const app=express();

//dotenv.config({path:'./config.env'});
require('dotenv').config();
const DB=process.env.DATABASE;
//const DB=process.env.DATABASE;
// mongoose.connect(DB).then(()=>{
//     console.log("connection successful");
// }).catch((err)=>console.log("This is error-"+err));
const PORT=process.env.PORT;

(async ()=>{
    try{
      await mongoose.connect(DB,{useNewUrlParser:true})
      console.log("database connected successfully")
    }catch(err){
      console.log('error'+err)
    }
  }
    )()
  app.us
app.use(express.json());

// const middleware=(req,res,next)=>{
// console.log("hello my middleware");
// next();
// }
//app.use(middleware);
const authRoutes=require("./routes/auth");
app.use(authRoutes);

app.get("/",(req,res)=>{
    res.send("hello from server side")
})
app.get("/about",(req,res)=>{
    res.send("Hello from about page");
})


app.get("/register",(req,res)=>{
    res.send("hello from register page");
});
app.get("/login",(req,res)=>{
    res.send("hello from login page");
})
app.listen(5000,(req,res)=>{
    console.log(`server is running on ${PORT}`);
})