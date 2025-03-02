import express from 'express'
import { createUser, deleteUserById, getAllUsers, getUser, googleLogin, loginUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get("/",getUser)
userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.delete("/:id",deleteUserById)
userRouter.get("/allusers",getAllUsers)
userRouter.post("/google",googleLogin)


export default userRouter