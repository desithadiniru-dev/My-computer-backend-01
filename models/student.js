import mongoose from "mongoose";

const studentschema = new mongoose.Schema({
    name:String,
    age:Number,
    grade:String
})

const Student = mongoose.model("Student",studentschema)

export default Student