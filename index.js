import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routers/StudentRouter.js";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import authenticateUser from "./middlewears/authentication.js";
import productRouter from "./routers/productRouter.js";

const app = express()

const mongodbURI = "mongodb+srv://admin:1234@cluster0.9vzzpan.mongodb.net/icomputers?appName=Cluster0"

mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("connected to mongoDB")
    })
    .catch(err => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
    })

app.use(express.json())

app.use(authenticateUser) 
  
app.use("/students",studentRouter)
app.use("/users", userRouter)
app.use("/products",productRouter)

app.put("/",(req,res)=>{
    console.log("Put request recieved"); 
})

app.delete("/",(req,res)=>{
    console.log("Delete request recieved");
})

app.listen(3000,(req,res) => {
    console.log("Server is running on port 3000");
})
