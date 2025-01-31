import express from 'express'
import { adminReply, createFeedback, getAllFeedbacks } from '../controllers/feedbackController.js'


const feedbackRouter = express.Router()

feedbackRouter.post("/",createFeedback)
feedbackRouter.get("/",getAllFeedbacks)
feedbackRouter.post("/reply",adminReply)


export default feedbackRouter