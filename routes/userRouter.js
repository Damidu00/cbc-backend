import express from 'express'
import { createUser, deleteUserById, getAllUsers, googleLogin, loginUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.delete("/:id",deleteUserById)
userRouter.get("/",getAllUsers)
userRouter.post("/google",googleLogin)

export default userRouter