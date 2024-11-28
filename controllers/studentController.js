import Student from "../models/student.js"

export async function getallStudents (req,res){
    try{
        const allStudents = await Student.find()
        res.json({
            list:allStudents
        })
    }catch{
        res.json({
            message:"error"
        })
    }
    
}

export async function createStudent (req,res){
    try{
        const student = new Student(req.body)
        await student.save()
        res.json({message: "student created"})
    }catch{
        res.json({
            message : "Student not created",
            error:error.message
        })
    }
}

export async function deleteStudent (req,res){
    try{
        const result = await Student.deleteOne({name: req.body.name});
        if(result.deletedCount === 0){
            res.json({
                message: "No student found with the given name"
            });
        }else{
            res.json({
                message: "student deleted succseefuly"
            })
        }
    }catch(error){
        res.json({
            message : "Error deleting student",
            error:error.message
        })
    }
    
}