import express from 'express'
import { createUser, deleteUser, loginUser } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.delete("/:id",deleteUser)

export default userRouter