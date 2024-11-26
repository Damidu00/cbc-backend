import express from 'express'
import { createStudent , getallStudents,deleteStudent } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.get("/",getallStudents)
studentRouter.post("/",createStudent)
studentRouter.delete("/",deleteStudent)

export default studentRouter;