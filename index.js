import express from "express";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import authenticateUser from "./middlewears/authentication.js";
import productRouter from "./routers/productRouter.js";
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config()

const app = express()

const mongodbURI = process.env.MONGO_URI

mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("connected to mongoDB")
    })
    .catch(err => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
    })

app.use(cors())    
app.use(express.json())

app.use(authenticateUser) 
  
app.use("/api/users", userRouter)
app.use("/api/products",productRouter)

app.put("/",(req,res)=>{
    console.log("Put request recieved"); 
})

app.delete("/",(req,res)=>{
    console.log("Delete request recieved");
})

app.listen(3000,(req,res) => {
    console.log("Server is running on port 3000");
})
