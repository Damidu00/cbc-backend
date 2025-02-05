import express from 'express'
import { adminReply, createFeedback, deleteFeedback, getAllFeedbacks } from '../controllers/feedbackController.js'


const feedbackRouter = express.Router()

feedbackRouter.post("/",createFeedback)
feedbackRouter.get("/",getAllFeedbacks)
feedbackRouter.post("/reply",adminReply)
feedbackRouter.delete("/:feedbackId",deleteFeedback)


export default feedbackRouter