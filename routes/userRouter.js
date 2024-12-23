import express from 'express'
import { createUser, deleteUserById, getAllUsers, loginUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.delete("/:id",deleteUserById)
userRouter.get("/",getAllUsers)

export default userRouter