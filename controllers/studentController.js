import Student from "../models/student.js"

export function getallStudents (req,res){
    Student.find().then((allstudents)=>{
        res.json({
            list : allstudents
        })
    })
}

export function createStudent (req,res){
    const student = new Student(req.body)
    student.save().then(() =>{
        res.json({
            message:"Student Created"
        })
    }).catch(() =>{
        res.json({
            message:"Student not created"
        })
    })
}

export function deleteStudent (req,res){
    Student.deleteOne({name: req.body.name}).then(()=>{
        res.json({
            message:"Student deleted successfully!"
        })
    })
}