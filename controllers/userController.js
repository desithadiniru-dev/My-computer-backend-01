import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function createUser(req, res) {
   try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new user({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
    });

    await newUser.save();

    console.log("User created successfully");
    res.json({
        message: "User created successfully"
    });
   } catch (error) {
       console.error("Error creating user:", error.message);
       res.json({
           message: "Error creating user"
       });
   }
}

export async function loginUser(req, res) {
   try {
       const users = await user.findOne(
        {
            email: req.body.email,  
        });
        if (users == null) {
            res.status(404).json({
                message: "User not found",
            });
        }
        else{
            const passwordMatch = bcrypt.compareSync(req.body.password, users.password);
            if (passwordMatch) { //this means the password is correct
                const payload = {
                    email: users.email,
                    firstName: users.firstName,
                    lastName: users.lastName,
                    isAdmin: users.isAdmin,
                    isBlocked: users.isBlocked,
                    isEmailVerified: users.isEmailVerified,
                    image: users.image
                };
                const token = jwt.sign(payload, "icomputersbatch10",{expiresIn : "48h"});
                res.json({
                    message: "User logged in successfully",
                    token: token
                });
            
            } else {
                res.status(401).json({
                    message: "Invalid password", 
                });
            }
        }
    } catch (error) {
        console.status(500).log({
            message: "Error fetching users",
        });
    }
}

export function isAdmin(req){
    if(req.user==null){
        return false
    }
    if(req.user.isAdmin){
        return true
    }
    else{
        return false
    }
}
