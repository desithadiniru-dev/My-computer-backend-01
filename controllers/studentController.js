import Student from "../models/student.js";   

export function createStudent(req, res) {

    if (req.user==null){
        res.status(401).json({
            message:"Unauthorized access  you need to login before creating student"
        })
        return //This stops the createStudent function
    }

    if(!req.user.isAdmin){ // if NOT admin
        res.json({
            message: "Only admins can create students"
        })
        return
    }

    const newStudent = new Student({
        name:req.body.name,
        age:req.body.age,
        city:req.body.city
    })
    newStudent.save()
    .then(
        () => {
            console.log("Student saved to database");
            res.json({
                message:"Student saved successfully"
            });
        }
    )
    .catch(err=>{
        console.error("Erorr saving student:",err);
        res.status(500).json({
            message:"Error saving student",
            error:err.message
        });
    })
}

export async function createStudentAsync(req, res) {
    try {
    const newStudent = new Student({
            name:req.body.name,
            age:req.body.age,
            city:req.body.city
        })
    await newStudent.save();
    console.log("Student saved to database");
    res.json({
        message:"Student saved successfully"
    });
    } catch (error) {
        console.error("Error creating student:", error);
    }        
}


export function getStudents(req, res) {
    Student.find() // Ask MongoDB for all students
    .then(         // When MongoDB returns the students...

            (Students) => {
                    
                    res.json(Students) // Send the students back to the client
                }
    )
}  
