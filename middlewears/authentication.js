import jwt from "jsonwebtoken";

export default function authenticateUser(req,res,next){

       const header = req.header("Authorization")
       
           if(header != null){
               const token = header.replace("Bearer ","")
               jwt.verify(token, "icomputersbatch10", (error, decoded) => {
                   if (error) { // Check whether there is an error
                      res.status(401).json({  
                      message: "Invalid token, please login again" // Send a message if the token is invalid or expired
                    });
                    
                    } else {
                        console.log("Decoded token:", decoded)
                        req.user = decoded; // Save the decoded user information in req.user
                        next(); // Continue to the next middleware or route
                      }
                    });    
       
       
           }else{
               next() // <- pass control to next middleware/route
           }
}