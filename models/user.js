import mongoose from "mongoose";

const userschema = new mongoose.Schema(
   {
      email : {
        type: String,
        required: true,
        unique: true
      },
      firstName : {
        type: String,
        required: true
        },
      lastName : {   
        type: String,
        required: true
        },
      password : {
        type: String,
        required: true
        },
      isAdmin : {
        type: Boolean,
        required: true,
        default: false
        },
      isBlocked : {
        type: Boolean,
        required: true,
        default: false
        },
      isEmailVerified : {
        type: Boolean,
        required: true,
        default: false
        },
      image : {
        type: String, //Because we save this as a link in the database
        default: "images/default-profile.png"
        }            
    }
)

const User = mongoose.model("User",userschema)
export default User